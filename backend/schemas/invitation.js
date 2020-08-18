const { UserInputError, AuthenticationError, ForbiddenError } = require('apollo-server')
const Invitation = require('../models/invitation')
const Group = require('../models/group')

const typeDef = `
    type Invitation {
        owner: User!
		group: Group!
		id: ID!
		createdAt: String
    }
`

const resolvers = {
	Query: {
		getInvitationsByCurrentUser: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}
			
			try {

				return await Invitation.find({ owner: currentUser._id })
					.populate('group')
					.populate('owner')
						
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args: 
		// group: String!
		getInvitationByGroup: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}
			
			try {

				return await Invitation.findOne({ group: args.group })
					.populate('group')
					.populate('owner')
						
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
	},
	Mutation: {
		// args:
		// groupid: String!
		createInvitation: async (root, args, context) => {

			const currentUser = context.currentUser
			
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const groupInDB = await Group.findById({ _id: args.groupid })

			if (!groupInDB.users.includes(currentUser._id)) {
				throw new ForbiddenError('not authorized')
			}

			try {

				let invitation = new Invitation({
					group: args.groupid,
					owner: currentUser._id,
					createdAt: Date.now(),
				})

				const savedInvitation = await invitation.save()

				return Invitation.findOne({ _id: savedInvitation._id })
					.populate('owner')
					.populate('group')
                    
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args:
		// id: String!
		removeInvitation: async (root, args, context) => {

			const currentUser = context.currentUser
			
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const invitation = await Invitation.findById(args.id).populate('group')
				
			if (!invitation.group.users.includes(currentUser._id)) {
				throw new ForbiddenError('not authorized')
			}

			try {
				return await Invitation.findOneAndDelete({ _id: args.id })
					.populate('group')
					.populate('owner')
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args
		// inviteid: String!
		acceptGroupInvite: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const inviteInDB = await Invitation.findOne({ _id: args.inviteid })
		
			if (!inviteInDB) {
				throw new ForbiddenError('not authorized')
			}

			try {

				const filter = { 
					_id: inviteInDB.group
				}

				const update = { $addToSet: { users: currentUser._id }}

				return await Group
					.findOneAndUpdate(
						filter, 
						update,
						{ new: true }
					)
					.populate('owner', { email: 1, firstname: 1, lastname: 1 })
					.populate('users')
					.populate('people')
					.populate('expenses')

			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
	}
}

module.exports = { typeDef, resolvers }