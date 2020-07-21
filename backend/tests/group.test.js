const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const { constructTestServer } = require('../utils/testconfig')
const Group = require('../models/group')
const User = require('../models/user')
const { mongoose } = require('../index')
const bcrypt = require('bcryptjs')

const CREATE_GROUP = gql`
	mutation createGroup(
		$title: String!
		$location: String
		$users: [String]
		$people: [String]
	) {
		createGroup(
			title: $title
			location: $location
			users: $users
			people: $people
		) {
			title
			id
			location
			owner {
				email
				id
			}
			users {
				email
				id
			}
			people {
				id
				name
			}
		}
	}
`
const UPDATE_GROUP = gql`
	mutation updateGroup(
		$id: String!
		$title: String
		$location: String
		$users: [String]
		$people: [String]
		$owner: String
	) {
		updateGroup(
			id: $id
			title: $title
			location: $location
			users: $users
			people: $people
			owner: $owner
		) {
			id
			title
			location
			users {
				email
				id
			}
			people {
				id
				name
			}
			owner {
				email
				id
			}
		}
	}
`

const GET_GROUPS = gql`
	query {
		getGroups {
			id
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
		}
	}
`

const REMOVE_GROUP = gql`
	mutation removeGroup(
		$id: String!
	) {
		removeGroup(
			id: $id
		) {
			id
		}
	}
`
const ADD_GROUP_USER = gql`
	mutation addGroupUser(
		$groupid: String!
		$userid: String!
	) {
		addGroupUser(
			groupid: $groupid
			userid: $userid
		) {
			title
			users {
				email
				id
			}
		}
	}
`

const REMOVE_GROUP_USER = gql`
	mutation removeGroupUser(
		$groupid: String!
		$userid: String!
	) {
		removeGroupUser(
			groupid: $groupid
			userid: $userid
		) {
			id
			users {
				email
				id
			}
		}
	}
`

describe('Group mutations', () => {
	
	let userA
	let userB
	let defaultGroup

	beforeEach(async () => {
		await Group.deleteMany({})
		await User.deleteMany({})

		const hashedPassword = await bcrypt.hash('testpassword', 10)

		const userAToSave = new User({
			email: 'first@test.com',
			password: hashedPassword
		})
        
		userA = await userAToSave.save()

		const userBToSave = new User({
			email: 'second@test.com',
			password: hashedPassword
		})

		userB = await userBToSave.save()
		
		const defGroup = new Group({
			title: 'test group 1',
			location: 'test location',
			users: [userA._id],
			people: [],
			owner: userA._id
		})
		
		defaultGroup = await defGroup.save()
		
	})

	it('A non authenticated user can not save a new group', async () => {
		
		const { server } = constructTestServer()

		const { mutate } = createTestClient(server)

		const variables = { 
			title: 'test group',
			location: 'test location',
			users: [],
			people: []
		}

		const res = await mutate({
			mutation: CREATE_GROUP,
			variables,
		})
		
		expect(res.data.createGroup).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})

	it('A non authenticated user can not edit a group', async () => {
		
		const { server } = constructTestServer()

		const { mutate } = createTestClient(server)

		const variables = { 
			id: defaultGroup.id,
			title: 'changed title',
			location: 'changed location'
		}

		const res = await mutate({
			mutation: UPDATE_GROUP,
			variables,
		})
		
		expect(res.data.updateGroup).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})

	it('A user can not edit a group without a group membership', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: userB.id, 
				email: userB.email
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: defaultGroup.id,
			title: 'changed title',
			location: 'changed location'
		}

		const res = await mutate({
			mutation: UPDATE_GROUP,
			variables
		})
		
		expect(res.data.updateGroup).toEqual(null)
		expect(res.errors[0].message).toEqual('user is not a member of the group')
	})

	it('A user can edit a group with group membership', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: userA.id, 
				email: userA.email
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: defaultGroup.id,
			title: 'changed title',
			location: 'changed location'
		}

		const res = await mutate({
			mutation: UPDATE_GROUP,
			variables
		})
		
		expect(res.data.updateGroup.title).toEqual('changed title')
	})

	it('A non authenticated user can not remove a group', async () => {
		
		const { server } = constructTestServer()

		const { mutate } = createTestClient(server)

		const variables = { 
			id: defaultGroup.id
		}

		const res = await mutate({
			mutation: REMOVE_GROUP,
			variables,
		})
	
		expect(res.data.removeGroup).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})

	it('A user can not remove a group without a group membership', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: userB.id, 
				email: userB.email
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: defaultGroup.id
		}

		const res = await mutate({
			mutation: REMOVE_GROUP,
			variables,
		})
		
		expect(res.data.removeGroup).toEqual(null)
		expect(res.errors[0].message).toEqual('user is not a member of the group')
	})

	it('A user can remove a group with a group membership', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: userA.id, 
				email: userA.email
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			id: defaultGroup.id
		}

		const res = await mutate({
			mutation: REMOVE_GROUP,
			variables,
		})
		
		expect(res.data.removeGroup.id).toEqual(defaultGroup.id)
		
	})

	it('A non authenticated user can not add a new user to a group', async () => {
		
		const { server } = constructTestServer()

		const { mutate } = createTestClient(server)

		const variables = { 
			groupid: defaultGroup.id,
			userid: userB.id
		}

		const res = await mutate({
			mutation: ADD_GROUP_USER,
			variables,
		})
		
		expect(res.data.addGroupUser).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})

	it('A user can not add a user to a group without group membership', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: userB.id, 
				email: userB.email
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			groupid: defaultGroup.id,
			userid: userB.id
		}

		const res = await mutate({
			mutation: ADD_GROUP_USER,
			variables,
		})
		
		expect(res.data.addGroupUser).toEqual(null)
		expect(res.errors[0].message).toEqual('user is not a member of the group')
	})

	it('A user can add a user to a group with group membership', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: userA.id, 
				email: userA.email
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			groupid: defaultGroup.id,
			userid: userB.id
		}

		const res = await mutate({
			mutation: ADD_GROUP_USER,
			variables,
		})
		
		expect(res.data.addGroupUser.users[1].id).toEqual(userB.id)
		
	})

	it('A non authenticated user can not remove a user from a group', async () => {
		
		const { server } = constructTestServer()

		const { mutate } = createTestClient(server)

		const variables = { 
			groupid: defaultGroup.id,
			userid: userA.id
		}

		const res = await mutate({
			mutation: REMOVE_GROUP_USER,
			variables,
		})
		
		expect(res.data.removeGroupUser).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})

	it('A user can not remove a user to a group without group membership', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: userB.id, 
				email: userB.email
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			groupid: defaultGroup.id,
			userid: userA.id
		}

		const res = await mutate({
			mutation: REMOVE_GROUP_USER,
			variables,
		})
		
		expect(res.data.removeGroupUser).toEqual(null)
		expect(res.errors[0].message).toEqual('user is not a member of the group')
	})

	it('A user can remove a user of a group with group membership', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: userA.id, 
				email: userA.email
			} 
		})

		const { mutate } = createTestClient(server)

		const variables = { 
			groupid: defaultGroup.id,
			userid: userA.id
		}

		const res = await mutate({
			mutation: REMOVE_GROUP_USER,
			variables,
		})
		
		expect(res.data.removeGroupUser.users.length).toEqual(0)
		
	})
})

describe('Group queries', () => {
	
	let userA
	let userB
	let defaultGroup

	beforeEach(async () => {
		await Group.deleteMany({})
		await User.deleteMany({})

		const hashedPassword = await bcrypt.hash('testpassword', 10)

		const userAToSave = new User({
			email: 'first@test.com',
			password: hashedPassword
		})
        
		userA = await userAToSave.save()

		const userBToSave = new User({
			email: 'second@test.com',
			password: hashedPassword
		})

		userB = await userBToSave.save()
		
		const defGroup = new Group({
			title: 'test group 1',
			location: 'test location',
			users: [userA.id],
			people: [],
			owner: userA.id
		})
		
		defaultGroup = await defGroup.save()
		
	})

	it('A non authenticated user can not view groups', async () => {
		
		const { server } = constructTestServer()

		const { query } = createTestClient(server)

		const res = await query({
			query: GET_GROUPS
		})
		
		expect(res.data.getGroups).toEqual(null)
		expect(res.errors[0].message).toEqual('not authenticated')
	})

	it('A user can view groups where user has membership', async () => {
		
		const { server } = constructTestServer({
			currentUser: { 
				_id: userA._id, 
				email: userA.email
			} 
		})

		const { query } = createTestClient(server)

		const res = await query({
			query: GET_GROUPS
		})
		
		console.log(res)
		expect(res.data.getGroups.length).toEqual(1)
		expect(res.data.getGroups[0].title).toEqual(defaultGroup.title)
	})

})

afterAll(async done => {
	await mongoose.connection.close()
	await done()
})