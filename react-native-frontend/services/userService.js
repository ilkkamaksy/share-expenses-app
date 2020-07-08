import axios from 'axios'
const apiUrl = 'http://localhost:4000/graphql'

const REGISTER = `
	mutation register (
		$email: String!
		$password: String!
  ) {
	  register (
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
const LOGIN = `
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

const register = async credentials => {
	const variables = { email: credentials.email, password: credentials.password }
	const response = await axios.post(apiUrl, {
		query: REGISTER,
		variables: variables,
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return response
}

const login = async credentials => {
	const variables = { email: credentials.email, password: credentials.password }
	const response = await axios.post(apiUrl, {
		query: LOGIN,
		variables: variables,
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return response
}

export default { login, register }