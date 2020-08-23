import axios from 'axios'
const apiUrl = 'http://192.168.1.17:4000/graphql'

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
	const response = await axios.post(apiUrl, {
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
	const response = await axios.post(apiUrl, {
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
	const response = await axios.post(apiUrl, { query: ME }, config)

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

	return await axios.post(apiUrl, data, config)
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

	return await axios.post(apiUrl, data, config)
}