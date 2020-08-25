import axios from 'axios'
import APIURL from '../utils/config'
import auth from '../utils/auth' 

const ADD_PERSON = `
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
			id: $groupid
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

export const addPerson = async (args) => {
	const variables = { 
		name: args.name,
		groupid: args.groupid
	}

	const data = {
		query: ADD_PERSON,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(APIURL, data, config)
}

export const updatePerson = async (args) => {
	const variables = { 
		name: args.name,
		id: args.id
	}

	const data = {
		query: UPDATE_PERSON,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(APIURL, data, config)
}

export const removePerson = async id => {
	const variables = { 
		id
	}

	const data = {
		query: REMOVE_PERSON,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(APIURL, data, config)
}
