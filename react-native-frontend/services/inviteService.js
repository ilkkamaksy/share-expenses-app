import axios from 'axios'
const apiUrl = 'http://192.168.1.17:4000/graphql'

import auth from '../utils/auth' 

const CREATE_INVITATION = `
	mutation createInvitation(
		$groupid: String!
	){
		createInvitation(
			groupid: $groupid
		) {
			  id
			  createdAt
			  owner {
				  id
			  }
			  group {
				  id
			  }
		}
  }
`

const REMOVE_INVITATION = `
	mutation removeInvitation(
		$id: String!
	) {
		removeInvitation(
			id: $id
		) {
			  id
			  owner {
				  id
			  }
			  group {
				  id
			  }
		}
  }
`

const GET_INVITATION_BY_GROUP = `
	query getInvitationByGroup(
		$group: String!
	){
		getInvitationByGroup(
			group: $group
		) {
			  id
			  createdAt
			  owner {
                  id
                  email
			  }
			  group {
                  id
                  title
			  }
		}
  }
`

const GET_INVITATIONS_BY_CURRENT_USER = `
query {
	getInvitationsByCurrentUser {
		id
		createdAt
		owner {
			id
		}
		group {
			id
		}
	}
}
`

const ACCEPT_GROUP_INVITATION = `
	mutation acceptGroupInvite(
        $inviteid: String!
	) {
		acceptGroupInvite(
            inviteid: $inviteid
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


export const createInvitation = async groupid => {
	
	const variables = { 
		groupid
	}

	const data = {
		query: CREATE_INVITATION,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

export const removeInvitation = async id => {
	
	const variables = { 
		id
	}

	const data = {
		query: REMOVE_INVITATION,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

export const getInvitationByGroup = async (groupid) => {
	
	const variables = { 
		group: groupid
	}

	const data = {
		query: GET_INVITATION_BY_GROUP,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

export const getInvitationsByCurrentUser = async () => {
	
	const data = {
		query: GET_INVITATIONS_BY_CURRENT_USER
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}

export const acceptGroupInvite = async (inviteid) => {
	
	const variables = { 
		inviteid
	}

	const data = {
		query: ACCEPT_GROUP_INVITATION,
		variables: variables
	}

	const config = {
		headers: {
			'Authorization': auth.token
		}
	}

	return await axios.post(apiUrl, data, config)
}