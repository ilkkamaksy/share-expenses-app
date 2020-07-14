const { UserInputError, AuthenticationError } = require('apollo-server')
const Person = require('../models/person')
const Group = require('../models/group')

const typeDef = `
    type Person {
        name: String!
        group: Group
        id: ID!
    }
`

const resolvers = {
	Query: {
		// args: 
		// groupid: String! 
		getPeopleByGroupId: async (root, args, context) => {

			const currentUser = context.currentUser
			
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			return await Person
				.find({ people: { $in: [ args.groupid ] } })
				.populate( 'group' )
		}, 
		// args: 
		// id: String! 
		getPersonById: async (root, args, context) => {

			const currentUser = context.currentUser
			
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			return await Person.findById(args.id).populate('group')
		}, 
	},
	Mutation: {
		// args:
		// groupid: String!
		// name: String!
		addPersonToGroup: async (root, args, context) => {

			const currentUser = context.currentUser
			
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}
			
			try {
				let person = new Person({
					name: args.name.trim(),
					group: args.groupid
				})
				const newPerson = await person.save()
				const group = await Group
					.findByIdAndUpdate(
						args.groupid, 
						{ $addToSet: { people: newPerson._id }}, 
						{ new: true }
					)
					.populate('users')
					.populate('people')

				return {
					name: newPerson.name,
					id: newPerson._id,
					group: group
				}
                    
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args:
		// id: String!
		// name: String
		editPerson: async (root, args) => {
			try {

				let personToUpdate = {
					...args
				}
				
				delete personToUpdate.id
				const savedPerson = await Person
					.findByIdAndUpdate(args.id, personToUpdate, { new: true })
					.populate('group') 
				return savedPerson
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		// args:
		// id: String!
		removePerson: async (root, args) => {
			try {
				return await Person
					.findByIdAndDelete(args.id)
					.populate('group')
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
	}
}

module.exports = { typeDef, resolvers }