const { createTestClient } = require('apollo-server-testing')
const { constructTestServer } = require('../utils/testconfig')
const Group = require('../models/group')
const User = require('../models/user')
const Person = require('../models/person')
const Expense = require('../models/expense')
const { mongoose } = require('../index')
const bcrypt = require('bcryptjs')

const ADD_EXPENSE_TO_GROUP = `
	mutation addExpense(
		$groupid: String!
		$description: String!
		$amount: Float!
		$dateTime: String
		$details: [ExpenseDetails!]
	) {
		addExpense(
			groupid: $groupid
			description: $description
			amount: $amount
			dateTime: $dateTime
			details: $details
		) {
			id
			lastUpdatedAt
			createdAt
			title
			location
			owner {
				id
			}
			users {
				id
				email
			}
			people {
				id
				name
			}
			expenses {
				id
				dateTime
				amount
				description
				details {
					person
					share
					paid
					balance
				}
			}
		}
	}
`

const REMOVE_EXPENSE = `
	mutation removeExpense(
		$id: String!
	){
		removeExpense(
			id: $id
		) {
	 	 	id
		}
  }
`

describe('Expense mutations', () => {
	
	let testUser
	let testPerson
	let testGroup
	let testExpense

	beforeEach(async () => {
		await Group.deleteMany({})
		await User.deleteMany({})
		await Person.deleteMany({})
		await Expense.deleteMany({})

		const user = new User({
			email: 'first@test.com',
			password: 'testpassword'
		})
        
		testUser = await user.save()
        
		const person = new Person({
			name: 'Test Person 1'
		})
        
		testPerson = await person.save()
        
		const defGroup = new Group({
			title: 'test group 1',
			location: 'test location',
			users: [testUser._id],
			people: [testPerson.id],
			owner: testUser._id
		})
		
		testGroup = await defGroup.save()
        
		testPerson.group = testGroup._id
		testPerson = await testPerson.save()

		let expense = new Expense({
			group: testGroup._id,
			description: 'description',
			amount: 2000,
			dateTime: new Date(Date.now()),
			details: [{
				person: testPerson._id,
				share: 2000,
				paid: 2000,
				balance: 0
			}]
		})

		testExpense = await expense.save()
				
		await Group.findByIdAndUpdate(
			testGroup._id, 
			{ $addToSet: { expenses: testExpense._id }}, 
			{ new: true }
		)
	})

	it('A non authenticated user can not add an expense to a group', async () => {
		
		const { server } = constructTestServer()

		const { mutate } = createTestClient(server)

		let variables = {
			groupid: testGroup.id,
			description: 'description test',
			amount: 1000,
			dateTime: new Date(Date.now()).toLocaleDateString(),
			details: [{
				personId: testPerson.id,
				share: 1000,
				paid: 1000,
				balance: 0
			}]
		}

		const res = await mutate({
			mutation: ADD_EXPENSE_TO_GROUP,
			variables,
		})
        
		expect(res.data.addExpense).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})

	it('A user with group membership can add a new expense to group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: testUser.id
			} 
		})

		const { mutate } = createTestClient(server)

		let variables = {
			groupid: testGroup.id,
			description: 'description test',
			amount: 1000,
			dateTime: new Date(Date.now()).toLocaleDateString(),
			details: [{
				personId: testPerson.id,
				share: 1000,
				paid: 1000,
				balance: 0
			}]
		}

		const res = await mutate({
			mutation: ADD_EXPENSE_TO_GROUP,
			variables
		})
		
		expect(res.data.addExpense.expenses[1].amount).toEqual(1000)
	})

	it('A user without a group membership can not add a new expense to group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: 'wrong_user_id'
			} 
		})

		const { mutate } = createTestClient(server)

		let variables = {
			groupid: testGroup.id,
			description: 'description test',
			amount: 1000,
			dateTime: new Date(Date.now()).toLocaleDateString(),
			details: [{
				personId: testPerson.id,
				share: 1000,
				paid: 1000,
				balance: 0
			}]
		}

		const res = await mutate({
			mutation: ADD_EXPENSE_TO_GROUP,
			variables
		})
		
		expect(res.data.addExpense).toEqual(null)
		expect(res.errors[0].message).toEqual('not authorized')
	})

	it('A non authenticated user can not remove an expense', async () => {
		
		const { server } = constructTestServer()

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testExpense.id
		}

		const res = await mutate({
			mutation: REMOVE_EXPENSE,
			variables,
		})
	
		expect(res.data.removeExpense).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})

	it('A user without group membership can not remove an expense from a group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: 'u1'
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testExpense.id
		}

		const res = await mutate({
			mutation: REMOVE_EXPENSE,
			variables
		})
		
		expect(res.data.removeExpense).toEqual(null)
		expect(res.errors[0].message).toEqual('not authorized')
	})

	it('A user with group membership can remove an expense from a group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: testUser.id, 
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testExpense.id
		}

		const res = await mutate({
			mutation: REMOVE_EXPENSE,
			variables
		})
		
		expect(res.data.removeExpense.id).toEqual(testExpense.id)
		
	})

	it('Deleting an expense from group removes both expense from db and reference in group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: testUser.id, 
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testExpense.id
		}

		const res = await mutate({
			mutation: REMOVE_EXPENSE,
			variables
		})
		
		expect(res.data.removeExpense.id).toEqual(testExpense.id)

		const groupInDb = await Group.findById(testGroup.id)
		expect(groupInDb.expenses).toEqual(expect.not.arrayContaining([testExpense.id]))
		
	})
})


afterAll(async done => {
	await mongoose.connection.close()
	await done()
})