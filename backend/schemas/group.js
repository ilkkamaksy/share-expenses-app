const { UserInputError, AuthenticationError, ForbiddenError } = require('apollo-server')
const Group = require('../models/group')

const typeDef = `
    type Group {
		id: ID!
		lastUpdatedAt: String,
		createdAt: String
		title: String!
		location: String
        owner: User!
		users: [User!]
		people: [Person!]
		expenses: [Expense!]
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

			let sort = { lastUpdatedAt: -1 }

			if (args.sortBy && args.sortBy === 'createdAt') {
				sort = { createdAt: args.order ? args.order : -1 }
			} 
			
			if (args.sortBy && args.sortBy === 'title') {
				sort = { title: args.order ? args.order : 1 }
			}
			
			return Group.find({ users: { $in: [ currentUser._id ] } }, null, { sort })
				.populate('owner', { email: 1, firstname: 1, lastname: 1 })
				.populate('users')
				.populate('people')
				.populate('expenses')
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
					owner: currentUser._id,
					users: args.users && args.users.length > 0 ? args.users : [currentUser._id],
					people: args.people && args.people.length > 0 ? args.people : [],
					createdAt: now,
					lastUpdatedAt: now
				}

				if (args.location) {
					group.location = args.location.trim()
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
					.populate('expenses')
					
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

			const groupInDB = await Group.findOne({ _id: args.id, users: currentUser._id })

			if (!groupInDB) {
				throw new ForbiddenError('not authorized')
			}

			try {

				let groupToUpdate = {
					...args,
					lastUpdatedAt: Date.now()
				}
				groupToUpdate.lastUpdatedAt instanceof Date

				if (args.title) {
					groupToUpdate.title = args.title.trim()
				}

				if (args.location) {
					groupToUpdate.location = args.location.trim()
				}
				
				delete groupToUpdate.id

				return await Group
					.findByIdAndUpdate(args.id, groupToUpdate, { new: true })
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
		// args:
		// id: String!
		removeGroup: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const groupInDB = await Group.findOne({ _id: args.id, users: currentUser._id })

			if (!groupInDB) {
				throw new ForbiddenError('not authorized')
			}

			try {

				const filter = {
					_id: args.id,
					owner: currentUser._id
				}

				return await Group
					.findOneAndDelete(
						filter
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
		// args
		// groupid: String!
		// userid: String!
		addGroupUser: async (root, args, context) => {

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const groupInDB = await Group.findOne({ _id: args.groupid, users: currentUser._id })

			if (!groupInDB) {
				throw new ForbiddenError('not authorized')
			}

			try {

				const filter = { 
					_id: args.groupid,
					users: currentUser._id, 
				}

				const update = { $addToSet: { users: args.userid }}

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
		// args
		// groupid: String!
		// userid: String!
		removeGroupUser: async (root, args, context) => {

			console.log('asfsaf', args)
			
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const groupInDB = await Group.findOne({ _id: args.groupid, users: currentUser._id })

			if (!groupInDB) {
				throw new ForbiddenError('not authorized')
			}

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
					.populate('expenses')

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