import axios from 'axios'
const apiUrl = 'http://192.168.1.17:4000/graphql'

import auth from '../utils/auth' 

const ADD_EXPENSE = `
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
		query: ADD_EXPENSE,
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