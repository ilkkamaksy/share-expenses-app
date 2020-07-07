const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')
const { constructTestServer } = require('../utils/testconfig')
const User = require('../models/user')
const { mongoose } = require('../index')

const REGISTER = gql`
	mutation register (
		$email: String!
		$password: String!
  ) {
	  register (
    	email: $email,
		password: $password
	) {
		id
		email
	}
  }
`
describe('Register mutations', () => {
	
	beforeEach(async () => {
		await User.deleteMany({})
	})

	it('user can register with valid email and password', async () => {
		
		const { server } = constructTestServer({
			context: () => {},
		})

		const { mutate } = createTestClient(server)
		const res = await mutate({
			mutation: REGISTER,
			variables: {
				email: 'a@a.a',
				password: 'password'
			},
		})
		expect(res.data.register.email).toEqual('a@a.a')
	})

	it('user can not register without password', async () => {
		
		const { server } = constructTestServer({
			context: () => {},
		})

		const { mutate } = createTestClient(server)
		const res = await mutate({
			mutation: REGISTER,
			variables: {
				email: 'a@a.a',
			},
		})
		expect(res.errors[0].message).toEqual('Variable "$password" of required type "String!" was not provided.')
	})

	it('user can not register without an email address', async () => {
		
		const { server } = constructTestServer({
			context: () => {},
		})

		const { mutate } = createTestClient(server)
		const res = await mutate({
			mutation: REGISTER,
			variables: {
				password: 'password'
			},
		})
		expect(res.errors[0].message).toEqual('Variable "$email" of required type "String!" was not provided.')
	})

	it('user can not register with empty email address', async () => {
		
		const { server } = constructTestServer({
			context: () => {},
		})

		const { mutate } = createTestClient(server)
		const res = await mutate({
			mutation: REGISTER,
			variables: {
				email: '',
				password: 'password'
			},
		})
		
		expect(res.errors[0].message).toEqual('User validation failed: email: Path `email` is required.')
	})

	it('user can not register with an email address length < 4', async () => {
		
		const { server } = constructTestServer({
			context: () => {},
		})

		const { mutate } = createTestClient(server)
		const res = await mutate({
			mutation: REGISTER,
			variables: {
				email: 'a@a',
				password: 'password'
			},
		})
		expect(res.errors[0].message).toEqual('User validation failed: email: Path `email` (`a@a`) is shorter than the minimum allowed length (4).')
	})
})

afterAll(async done => {
	await mongoose.connection.close()
	await done()
})