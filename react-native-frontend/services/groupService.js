import axios from 'axios'
const apiUrl = 'http://192.168.1.17:4000/graphql'

import auth from '../utils/auth' 

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
			id
			title
			lastUpdatedAt
			createdAt
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
			lastUpdatedAt
			createdAt
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

const GET_GROUPS = `
	query getGroups($sortBy: String, $order: Float) {
		getGroups(sortBy: $sortBy, order: $order) {
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
const REMOVE_GROUP_USER = `
	mutation removeGroupUser(
		$groupid: String!
		$userid: String!
	) {
		removeGroupUser(
			groupid: $groupid
			userid: $userid
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

export const createGroup = async (group) => {
	
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
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

export const updateGroup = async (group) => {

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
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

export const getGroups = async (args) => {
	
	const variables = {
		sortBy: args.sortBy,
		order: args.order
	}

	const data = {
		query: GET_GROUPS,
		variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

export const removeGroup = async id => {
	const variables = { 
		id: id
	}

	const data = {
		query: REMOVE_GROUP,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

export const removeGroupUser = async (userid, groupid) => {
	const variables = {
		groupid,
		userid
	}

	console.log('variables', variables)
	
	const data = {
		query: REMOVE_GROUP_USER,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}