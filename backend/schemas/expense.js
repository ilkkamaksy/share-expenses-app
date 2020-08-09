const { UserInputError, AuthenticationError, ForbiddenError } = require('apollo-server')
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

			const currentUser = context.currentUser
			
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}
			
			const groupInDB = await Group.findById(args.groupid)

			if (!groupInDB.users.includes(currentUser._id)) {
				throw new ForbiddenError('not authorized')
			}

			try {

				let expense = new Expense({
					group: args.groupid,
					description: args.description.trim(),
					amount: args.amount,
					dateTime: args.dateTime,
					details: args.details.map(item => { 
						return {
							person: item.personId,
							share: item.share,
							paid: item.paid,
							balance: item.balance,
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
		// args
		// id: ID!
		removeExpense: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const groupInDB = await Group.findOne({ expenses: args.id })

			if (!groupInDB.users.includes(currentUser._id)) {
				throw new ForbiddenError('not authorized')
			}

			try {

				return await Expense.findOneAndDelete({ _id: args.id })
					
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		}
	}
}

module.exports = { typeDef, resolvers }