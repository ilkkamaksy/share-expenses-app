const { UserInputError, AuthenticationError } = require('apollo-server')
const Group = require('../models/group')

const typeDef = `
    type Group {
		title: String!
		location: String
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
		// location: String
		// users: [String!]
		// people: [String!]
		createGroup: async (root, args, context) => {
			
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			try {

				const now = Date.now()

				let group = {
					title: args.title.trim(),
					location: args.location.trim(),
					owner: currentUser._id,
					users: args.users.length > 0 ? args.users : [currentUser._id],
					people: args.people.length > 0 ? args.people : [],
					createdAt: now,
					lastUpdatedAt: now
				}

				let newGroup = new Group(group)
				group.date instanceof Date
				group.createdAt instanceof Date
				group.lastUpdatedAt instanceof Date

				await newGroup.save()

				return await Group.findOne({ _id: newGroup._id })
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
		// title: String
		// location: String
		// owner: String
		// people: [String]
		// users: [String]
		updateGroup: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			try {

				let groupInDB = await Group.findById({ _id: args.id })

				if (!groupInDB.users.includes(currentUser._id)) {
					throw new AuthenticationError('user is not a member of the group')
				}

				const groupToUpdate = {
					...args,
					title: args.title.trim(),
					location: args.location.trim(),
					lastUpdatedAt: Date.now()
				}
				delete groupToUpdate.id

				return await Group
					.findByIdAndUpdate(args.id, groupToUpdate, { new: true })
					.populate('owner', { email: 1, firstname: 1, lastname: 1 })
					.populate('users')
					.populate('people')

			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args:
		// id: String!
		removeGroup: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			try {

				let groupInDB = await Group.findById({ _id: args.id })

				if (!groupInDB.users.includes(currentUser._id)) {
					throw new AuthenticationError('user is not a member of the group')
				}

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
		addGroupUser: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			try {

				let groupInDB = await Group.findById({ _id: args.groupid })

				if (!groupInDB.users.includes(currentUser._id)) {
					throw new AuthenticationError('user is not a member of the group')
				}

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
		removeGroupUser: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			try {

				let groupInDB = await Group.findById({ _id: args.groupid })

				if (!groupInDB.users.includes(currentUser._id)) {
					throw new AuthenticationError('user is not a member of the group')
				}

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