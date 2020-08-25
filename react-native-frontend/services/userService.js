import axios from 'axios'
import APIURL from '../utils/config'
import auth from '../utils/auth' 

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
const ME = `
	query {
		me {
			id
			email
			name
		}
  	}
`

const UPDATE_USER = `
	mutation updateUser(
		$id: String!
		$name: String
		$email: String
		$password: String
  ) {
	  updateUser(
		id: $id
		name: $name
    	email: $email,
		password: $password
	) {
		id
		name
		email
	}
  }
`

const REMOVE_USER = `
	mutation {
		removeUser {
			id
			email
		}
	} 
`

export const register = async credentials => {
	const variables = { email: credentials.email, password: credentials.password }

	const response = await axios.post(APIURL, {
		query: REGISTER,
		variables: variables,
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return response
}

export const login = async credentials => {
	const variables = { email: credentials.email, password: credentials.password }
	const response = await axios.post(APIURL, {
		query: LOGIN,
		variables: variables,
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return response
}

export const me = async () => {

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}
	const response = await axios.post(APIURL, { query: ME }, config)

	return response
}

export const updateUser = async userdata => {

	const variables = { 
		id: userdata.id,
		name: userdata.name,
		email: userdata.email, 
		password: userdata.password 
	}

	const data = {
		query: UPDATE_USER,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(APIURL, data, config)
}

export const removeUser = async () => {
	
	const data = {
		query: REMOVE_USER
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(APIURL, data, config)
}