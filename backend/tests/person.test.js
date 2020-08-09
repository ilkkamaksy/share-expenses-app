const { createTestClient } = require('apollo-server-testing')
const { constructTestServer } = require('../utils/testconfig')
const Group = require('../models/group')
const User = require('../models/user')
const Person = require('../models/person')
const { mongoose } = require('../index')
const bcrypt = require('bcryptjs')

const ADD_PERSON_TO_GROUP = `
	mutation addPersonToGroup(
		$groupid: String!
		$name: String!
	) {
		addPersonToGroup(
			groupid: $groupid
			name: $name
		) {
			id
			name
		}
	}
`

const UPDATE_PERSON = `
	mutation editPerson(
		$id: String!
		$name: String!
	) {
		editPerson(
			id: $id
			name: $name
		) {
			id
			name
		}
	}
`

const REMOVE_PERSON = `
	mutation removePerson(
		$id: String!
	) {
		removePerson(
			id: $id
		) {
			id
			name
		}
	}
`

describe('Person mutations', () => {
	
	let testUser
	let testPerson
	let defaultGroup

	beforeEach(async () => {
		await Group.deleteMany({})
		await User.deleteMany({})
		await Person.deleteMany({})
		
		const hashedPassword = await bcrypt.hash('testpassword', 10)

		const user = new User({
			email: 'first@test.com',
			password: hashedPassword
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
		
		defaultGroup = await defGroup.save()
        
		testPerson.group = defaultGroup._id
		testPerson = await testPerson.save()

	})

	it('A non authenticated user can not add a person to a group', async () => {
		
		const { server } = constructTestServer()

		const { mutate } = createTestClient(server)

		const variables = { 
			groupid: defaultGroup.id,
			name: 'test person'
		}

		const res = await mutate({
			mutation: ADD_PERSON_TO_GROUP,
			variables,
		})
        
		expect(res.data.addPersonToGroup).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})

	it('A non authenticated user can not edit a person', async () => {
		
		const { server } = constructTestServer()

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testPerson.id,
			name: 'changed name'
		}

		const res = await mutate({
			mutation: UPDATE_PERSON,
			variables
		})
		
		expect(res.data.editPerson).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})


	it('A user without group membership can not edit a person in a group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: 'wrongId'
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testPerson.id,
			name: 'changed name'
		}

		const res = await mutate({
			mutation: UPDATE_PERSON,
			variables
		})
		
		expect(res.data.editPerson).toEqual(null)
		expect(res.errors[0].message).toEqual('not authorized')
	})

	it('A user with group membership can edit a person in a group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: testUser.id
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testPerson.id,
			name: 'changed name'
		}

		const res = await mutate({
			mutation: UPDATE_PERSON,
			variables
		})
		
		expect(res.data.editPerson.name).toEqual('changed name')

	})

	it('A user without group membership can not add a person in a group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: 'wrongId'
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			groupid: defaultGroup.id,
			name: 'New Person'
		}

		const res = await mutate({
			mutation: ADD_PERSON_TO_GROUP,
			variables
		})
		
		expect(res.data.addPersonToGroup).toEqual(null)
		expect(res.errors[0].message).toEqual('not authorized')
	})

	it('A user with group membership can add a new person to group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: testUser.id
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			groupid: defaultGroup.id,
			name: 'New Person'
		}

		const res = await mutate({
			mutation: ADD_PERSON_TO_GROUP,
			variables
		})
        
		expect(res.data.addPersonToGroup.name).toEqual('New Person')
	})

	it('A non authenticated user can not remove a person', async () => {
		
		const { server } = constructTestServer()

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testPerson.id
		}

		const res = await mutate({
			mutation: REMOVE_PERSON,
			variables,
		})
	
		expect(res.data.removePerson).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})

	it('A user without group membership can not remove a person in a group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: 'u1'
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testPerson.id
		}

		const res = await mutate({
			mutation: REMOVE_PERSON,
			variables
		})
		
		expect(res.data.removePerson).toEqual(null)
		expect(res.errors[0].message).toEqual('not authorized')
	})

	it('A user with group membership can remove a person from a group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: testUser.id, 
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testPerson.id
		}

		const res = await mutate({
			mutation: REMOVE_PERSON,
			variables
		})
		
		expect(res.data.removePerson.id).toEqual(testPerson.id)
		
	})

	it('Deleting a person from group removes both person from db and reference in group', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: testUser.id, 
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: testPerson.id
		}

		const res = await mutate({
			mutation: REMOVE_PERSON,
			variables
		})
		
		expect(res.data.removePerson.id).toEqual(testPerson.id)

		const groupInDb = await Group.findById(defaultGroup.id)
		expect(groupInDb.people).toEqual(expect.not.arrayContaining([testPerson.id]))
		
	})
})


afterAll(async done => {
	await mongoose.connection.close()
	await done()
})