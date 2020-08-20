import * as inviteService from '../../services/inviteService'
import '../reducers/invitations'

export const addInvitation = (groupid) => {
	return async dispatch => {
		dispatch({
			type: 'INIT_ADD_INVITATION',
		})

		const response = await inviteService.createInvitation(groupid)
	
		if (!response || response.data.errors) {
			return dispatch({
				type: 'ADD_INVITATION_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'ADD_INVITATION_SUCCESS',
			invitation: response.data.data.createInvitation
		})
	}	
}

export const removeInvitation = (id) => {
	return async dispatch => {
		dispatch({
			type: 'INIT_REMOVE_INVITATION',
		})

		const response = await inviteService.removeInvitation(id)
	
		if (!response || response.data.errors) {
			return dispatch({
				type: 'REMOVE_INVITATION_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'REMOVE_INVITATION_SUCCESS',
			invitation: response.data.data.removeInvitation
		})
	}	
}

export const getInvitationsByCurrentUser = () => {
	return async dispatch => {

		dispatch({
			type: 'INIT_GET_OWNED_INVITATIONS',
		})

		const response = await inviteService.getInvitationsByCurrentUser()
	
		
		if (!response || response.data.errors) {
			return dispatch({
				type: 'GET_OWNED_INVITATIONS_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'GET_OWNED_INVITATIONS_SUCCESS',
			invitations: response.data.data.getInvitationsByCurrentUser
		})
	}	
}

export const getInvitationByGroup = (groupid) => {
	return async dispatch => {

		dispatch({
			type: 'INIT_GET_OPEN_INVITATION',
		})

		const response = await inviteService.getInvitationByGroup(groupid)
	
		if (!response || response.data.errors) {
			return dispatch({
				type: 'GET_OPEN_INVITATION_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'GET_OPEN_INVITATION_SUCCESS',
			invitation: response.data.data.getInvitationByGroup
		})
	}	
}

export const acceptGroupInvite = (inviteid) => {
	return async dispatch => {
		dispatch({
			type: 'INIT_ACCEPT_INVITATION',
		})

		const response = await inviteService.acceptGroupInvite(inviteid)
	
		if (!response || response.data.errors) {
			return dispatch({
				type: 'ACCEPT_INVITATION_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'ACCEPT_INVITATION_SUCCESS',
			group: response.data.data.acceptGroupInvite
		})
	}	
}

export const rejectGroupInvite = (inviteid) => {
	return dispatch => {
		dispatch({
			type: 'REJECT_INVITATION',
			inviteid
		})
	}	
}

export const setReferrerUrl = (referrerUrl) => {
	return dispatch => {
		dispatch({
			type: 'SET_REFERRER_URL',
			referrerUrl
		})
	}
}