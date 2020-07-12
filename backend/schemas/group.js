const { UserInputError, AuthenticationError } = require('apollo-server')
const Group = require('../models/group')

const typeDef = `
    type Group {
        title: String!
        owner: User!
		users: [User!]
		people: [Person!]
        id: ID!
    }
`

const resolvers = {
	Query: {
		// args:
		getGroups: async (root, args, context) => {

			const currentUser = context.currentUser
			
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}
			
			return Group.find({ users: { $in: [ currentUser._id ] } }, null, {sort: { lastUpdatedAt: -1 }})
				.populate('owner', { email: 1, firstname: 1, lastname: 1 })
				.populate('users')
				.populate('people')
		},
	},
	Mutation: {
		// args:
		// title: String!
		// users: [String!]
		// people: [String!]
		saveGroup: async (root, args, context) => {
			
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			try {

				let group = {
					title: args.title,
					owner: currentUser._id,
					users: args.users.length > 0 ? args.users : [currentUser._id],
					people: args.people ? args.people : [],
					createdAt: Date.now(),
					lastUpdatedAt: Date.now()
				}
				
				let newGroup = new Group(group)
				group.createdAt instanceof Date
				group.lastUpdatedAt instanceof Date

				await newGroup.save()
				
				return Group.findById(newGroup._id)
					.populate('owner', { email: 1, firstname: 1, lastname: 1 })
					.populate('users')
					.populate('people')
					
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args
		// id: String!
		// owner: String
		// title: String
		// people: [String]
		editGroup: async (root, args) => {

			try {
				const groupToUpdate = {
					...args
				}
				delete groupToUpdate.id
				const savedGroup = await Group
					.findByIdAndUpdate(args.id, groupToUpdate, { new: true })
					.populate('owner', { email: 1, firstname: 1, lastname: 1 })
					.populate('users')
					.populate('people')
				return savedGroup
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args:
		// id: String!
		removeGroup: async (root, args) => {
			try {
				return await Group
					.findByIdAndDelete(args.id)
					.populate('owner', { email: 1, firstname: 1, lastname: 1 })
					.populate('users')
					.populate('people')
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args
		// groupid: String!
		// userid: String!
		addGroupUser: async (root, args) => {
			try {
				const savedGroup = await Group
					.findByIdAndUpdate(
						args.groupid, 
						{ $addToSet: { users: args.userid }}, 
						{ new: true }
					)
					.populate('owner', { email: 1, firstname: 1, lastname: 1 })
					.populate('users')
					.populate('people')
				return savedGroup
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args
		// groupid: String!
		// userid: String!
		removeGroupUser: async (root, args) => {
			try {
				const savedGroup = await Group
					.findByIdAndUpdate(
						args.groupid, 
						{ $pull: { users: args.userid } },
						{ new: true }
					) 
					.populate('owner', { email: 1, firstname: 1, lastname: 1 })
					.populate('users')
					.populate('people')
				return savedGroup
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
	}
}

module.exports = { typeDef, resolvers }