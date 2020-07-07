const { UserInputError, AuthenticationError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

const typeDef = `
    type User {
        username: String
        firstname: String
		lastname: String
		email: String!
        id: ID!
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
			} else if ( args.username ) {
				return User.findOne({ username: args.username })
			} else if ( args.email ) {
				return User.findOne({ email: args.email })
			}
		}, 
		// args: 
		// username: String
		getUserByUsername: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			if ( args.username ) {
				return User.findOne({ username: args.username })
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
            
			return savedUser

		},
		// args:
		// id: String!
		// firstname: String
		// lastname: String
		editUser: async (root, args) => {
			try {

				let userToUpdate = {
					...args
				}
				
				delete userToUpdate.id
				const savedUser = await User.findByIdAndUpdate(args.id, userToUpdate, { new: true }) 
						
				return savedUser
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args:
		// id: String!
		removeUser: async (root, args) => {
			try {
				return await User.findByIdAndDelete(args.id)
				
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		login: async (root, args) => {
            
			const user = await User.findOne({ email: args.email })

			if ( !user || !args.password ) {
				throw new Error('Invalid Login')
			}

			const passwordMatch = await bcrypt.compare(args.password, user.password)

			if (!passwordMatch) {
				throw new Error('Invalid Login')
			}

			const token = jwt.sign(
				{
					id: user.id,
					username: user.email,
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