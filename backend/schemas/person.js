const { UserInputError } = require('apollo-server')
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
		// id: String
		// groupid: String 
		// username: String
		getPeople: async (root, args) => {
			if ( args.id ) {
				return [Person.findById(args.id).populate('group')]
			} else if ( args.name ) {
				return [Person.findOne({ name: args.name }).populate('group')]
			} else if ( args.groupid ) {
				return Person.find({ people: { $in: [ args.groupid ] } })
					.populate( 'group' )
			}
			return Person.find({}).populate('group')
		}, 
	},
	Mutation: {
		// args:
		// groupid: String!
		// name: String!
		addPerson: async (root, args) => {
			try {
				let person = new Person({
					name: args.name,
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

				const result = {
					name: newPerson.name,
					id: newPerson._id,
					group: group
				}

				return result
                    
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