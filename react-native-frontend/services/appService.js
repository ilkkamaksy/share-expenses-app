import axios from 'axios'
const apiUrl = 'http://192.168.1.17:4000/graphql'

import util from './util' 

const CREATE_GROUP = `
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
const UPDATE_GROUP = `
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

const GET_GROUPS = `
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

const REMOVE_GROUP = `
	mutation removeGroup(
		$id: String!
	) {
		removeGroup(
			id: $id
		) {
			title
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

const saveGroup = async (group) => {
	
	const variables = { 
		title: group.title,
		location: group.location,
		users: group.users,
		people: group.people
	}

	const data = {
		query: CREATE_GROUP,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': util.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

const updateGroup = async (group) => {

	console.log(group)
	
	const variables = { 
		id: group.id,
		title: group.title,
		location: group.location,
		users: group.users.map(user => user.id),
		people: group.people.map(person => person.id),
		owner: group.owner.id
	}

	const data = {
		query: UPDATE_GROUP,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': util.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

const getGroups = async () => {
	
	const data = {
		query: GET_GROUPS
	}

	const config = {
		headers: {
			'Authorization': util.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

const removeGroup = async id => {
	const variables = { 
		id: id
	}

	const data = {
		query: REMOVE_GROUP,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': util.token
		}
	}

	return await axios.post(apiUrl, data, config)
}


const addPersonToGroup = async (args) => {
	const variables = { 
		name: args.name,
		groupid: args.groupid
	}

	const data = {
		query: ADD_PERSON_TO_GROUP,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': util.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

const removePerson = async id => {
	const variables = { 
		id
	}

	const data = {
		query: REMOVE_PERSON,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': util.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

export default { saveGroup, updateGroup, getGroups, removeGroup, addPersonToGroup, removePerson }