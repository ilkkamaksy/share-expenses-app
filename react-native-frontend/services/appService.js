import axios from 'axios'
const apiUrl = 'http://192.168.1.17:4000/graphql'

import util from './util' 

const SAVE_GROUP = `
	mutation saveGroup(
		$title: String!
		$users: [String]
		$people: [String]
	) {
		saveGroup(
			title: $title
			users: $users
			people: $people
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

const GET_GROUPS = `
	query {
		getGroups {
			title
			id
			owner {
				id
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

const saveGroup = async (args) => {
	const variables = { 
		title: args.title,
		users: args.users,
		people: args.people
	}

	const data = {
		query: SAVE_GROUP,
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

export default { saveGroup, getGroups, removeGroup }