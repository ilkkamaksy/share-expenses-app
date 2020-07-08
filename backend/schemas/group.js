const { UserInputError } = require('apollo-server')
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
		// userid: String 
		getGroupsByUserId: async (root, args) => {

			if ( args.userid ) {
				return Group.find({ users: { $in: [ args.userid ] } })
					.populate('owner', { email: 1, firstname: 1, lastname: 1 })
					.populate('users')
					.populate('people')
			} 
		},
	},
	Mutation: {
		// args:
		// title: String!
		// owner: String!
		// users: [String!]
		// people: [String!]
		addGroup: async (root, args) => {
            
			try {

				let group = {
					title: args.title,
					owner: args.owner,
					users: args.users ? args.users : [args.owner],
					people: args.people ? args.people : []
				}
				
				let newGroup = new Group(group)
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