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

const ADD_EXPENSE_TO_GROUP = `
	mutation addExpense(
		$groupid: String!
		$description: String!
		$amount: Float!
		$dateTime: String
		$details: [ExpenseDetails!]
	) {
		addExpense(
			groupid: $groupid
			description: $description
			amount: $amount
			dateTime: $dateTime
			details: $details
		) {
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

const REMOVE_EXPENSE = `
	mutation removeExpense(
		$id: String!
	){
		removeExpense(
			id: $id
		) {
	 	 	id
		}
  }
`

export const saveGroup = async (group) => {
	
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
	
	console.log('getGroups token', auth.token)

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


export const addPersonToGroup = async (args) => {
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
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
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

	return await axios.post(apiUrl, data, config)
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

	return await axios.post(apiUrl, data, config)
}

export const addExpense = async (args) => {
	
	const variables = { 
		groupid: args.groupid,
		description: args.description,
		amount: args.amount,
		dateTime: args.date,
		details: args.details.map(item => { 
			return {
				personId: item.personId,
				share: item.share,
				paid: item.paid,
				balance: item.balance,
			}
		})
	}

	const data = {
		query: ADD_EXPENSE_TO_GROUP,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

export const removeExpense = async id => {
	
	const variables = { 
		id
	}

	const data = {
		query: REMOVE_EXPENSE,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}