const { UserInputError, AuthenticationError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

const typeDef = `
    type User {
		id: ID!
        name: String
		email: String!
	}
`

const resolvers = {
	Query: {
		// args: 
		// id: String 
		getUserById: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			if ( args.id ) {
				return User.findById({ _id: args.id })
			}
		}, 
		// args: 
		// email: String
		getUserByEmail: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			if ( args.email ) {
				return User.findOne({ email: args.email })
			} 
		}, 
		me: (root, args, context) => {
			return context.currentUser
		},
	},
	Mutation: {
		// args:
		// email: String!
		// password: String!
		register: async (root, args) => {
			
			if (!args.password || args.password.trim().length < 4) {
				throw new UserInputError('Please add a password that is at least 4 characters long.')
			}
			
			if (!args.email || args.email.trim().length < 3) {
				throw new UserInputError('Please add a valid email address.')
			}

			const hashedPassword = await bcrypt.hash(args.password, 10)
            
			let user = new User({
				email: args.email,
				password: hashedPassword
			})
			
			const savedUser = await user.save()

			if (!savedUser) {
				throw new UserInputError('Please check your email address and password are valid.', {
					invalidArgs: args
				})
			} 
			
			const token = jwt.sign(
				{
					id: savedUser.id,
					email: savedUser.email,
				},
				config.JWT_SECRET
			)
			return {
				token,
				user: savedUser,
			}
		},
		// args:
		// id: String!
		// name: String
		// email: String
		// password: String
		updateUser: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			try {

				let userToUpdate = {
					...args,
				}

				if (args.password) {
					
					const hashedPassword = await bcrypt.hash(args.password, 10)

					userToUpdate = {
						...userToUpdate,
						password: hashedPassword
					}
				}

				delete userToUpdate.id

				return await User.findByIdAndUpdate(currentUser._id, userToUpdate, { new: true }) 

			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args:
		removeUser: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			try {

				return await User.findByIdAndDelete(currentUser._id)
				
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		login: async (root, args) => {
            
			const user = await User.findOne({ email: args.email })

			if ( !user || !args.password ) {
				throw new Error('Invalid username or password')
			}

			const passwordMatch = await bcrypt.compare(args.password, user.password)

			if (!passwordMatch) {
				throw new Error('Invalid username or password')
			}

			const token = jwt.sign(
				{
					id: user.id,
					email: user.email,
				},
				config.JWT_SECRET
			)
			return {
				token,
				user,
			}
		}
	}
}

module.exports = { typeDef, resolvers }