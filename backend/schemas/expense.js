const { UserInputError, AuthenticationError } = require('apollo-server')
const Group = require('../models/group')
const Expense = require('../models/expense')

const typeDef = `
    type Expense {
		id: ID!
        description: String!
		amount: Float!
		details: [Detail]
		dateTime: String
		createdAt: String
		lastUpdatedAt: String
    }
`

const resolvers = {
	Mutation: {
		// args:
		// groupid: String!
		// description: String!
		// amount: Float!
		// details: [ExpenseDetails!]
		// dateTime: String
		addExpense: async (root, args, context) => {

			console.log(args)

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
					amount: args.amount,
					dateTime: args.dateTime,
					details: args.details.map(item => { 
						return {
							person: item.personId,
							share: item.share,
							paid: item.paid
						}
					})
				})

				let newExpense = await expense.save()
				
				return await Group.findByIdAndUpdate(
					args.groupid, 
					{ $addToSet: { expenses: newExpense._id }}, 
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