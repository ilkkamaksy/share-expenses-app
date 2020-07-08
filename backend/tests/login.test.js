const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const { constructTestServer } = require('../utils/testconfig')
const User = require('../models/user')
const { mongoose } = require('../index')
const bcrypt = require('bcryptjs')

const LOGIN = gql`
	mutation login (
		$email: String!
		$password: String!
  ) {
	  login (
    	email: $email,
		password: $password
	) {
		token
		user {
            id
            email   
        }
	}
  }
`
describe('Login mutations', () => {
	
	beforeEach(async () => {
		await User.deleteMany({})
        
		const hashedPassword = await bcrypt.hash('testpassword', 10)

		const user = new User({
			email: 'testuser@test.com',
			password: hashedPassword
		})
        
		await user.save()

	})

	it('user can login with valid email and password', async () => {
		
		const { server } = constructTestServer({
			context: () => {},
		})

		const { mutate } = createTestClient(server)
		const res = await mutate({
			mutation: LOGIN,
			variables: {
				email: 'testuser@test.com',
				password: 'testpassword'
			},
		})
		expect(res.data.login.user.email).toEqual('testuser@test.com')
	})

	it('user can not login without a valid password', async () => {
		
		const { server } = constructTestServer({
			context: () => {},
		})

		const { mutate } = createTestClient(server)
		const res = await mutate({
			mutation: LOGIN,
			variables: {
				email: 'testuser@test.com',
				password: 'wrongpass'
			},
		})
		expect(res.errors[0].message).toEqual('Invalid Login')
	})
    
	it('user can not login without a valid email', async () => {
		
		const { server } = constructTestServer({
			context: () => {},
		})

		const { mutate } = createTestClient(server)
		const res = await mutate({
			mutation: LOGIN,
			variables: {
				email: 'wronguser@test.com',
				password: 'testpassword'
			},
		})
		
		expect(res.errors[0].message).toEqual('Invalid Login')
	})

	it('user can not login with empty password and email', async () => {
		
		const { server } = constructTestServer({
			context: () => {},
		})

		const { mutate } = createTestClient(server)
		const res = await mutate({
			mutation: LOGIN,
			variables: {
				email: '',
				password: ''
			},
		})
		
		expect(res.errors[0].message).toEqual('Invalid Login')
	})
})

afterAll(async done => {
	await mongoose.connection.close()
	await done()
})