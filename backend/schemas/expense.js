const { UserInputError, AuthenticationError } = require('apollo-server')
const Person = require('../models/person')
const Group = require('../models/group')
const Expense = require('../models/expense')

const typeDef = `
    type Expense {
        description: String!
        amount: Float!
        id: ID!
    }
`

const resolvers = {
	Mutation: {
		// args:
		// groupid: String!
		// description: String!
		// amount: Float!
		// people: [String!]
		addExpense: async (root, args, context) => {

			const currentUser = context.currentUser
			
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}
			
			try {

				let groupInDB = await Group.findById({ _id: args.groupid })

				if (!groupInDB.users.includes(currentUser._id)) {
					throw new AuthenticationError('user is not a member of the group')
				}

				let expense = new Expense({
					description: args.description.trim(),
					amount: args.amount
				})

				let newExpense = await expense.save()
				
				const group = await Group
					.findByIdAndUpdate(
						args.groupid, 
						{ $addToSet: { expenses: newExpense._id }}, 
						{ new: true }
					)
					.populate('users')
					.populate('people')

				newExpense.id = newExpense._id
				delete newExpense._id
				
				return newExpense
                    
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
	}
}

module.exports = { typeDef, resolvers }