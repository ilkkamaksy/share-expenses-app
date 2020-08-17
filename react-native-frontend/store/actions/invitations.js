import * as inviteService from '../../services/inviteService'
import '../reducers/invitations'

export const addInvitation = (groupid) => {
	return async dispatch => {
		dispatch({
			type: 'INIT_ADD_INVITATION',
		})

		const response = await inviteService.createInvitation(groupid)
	
		if (response.data.data.createInvitation === null || response === null) {
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
	
		if (response.data.data.removeInvitation === null || response === null) {
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
	
		if (response.data.data.getInvitationsByCurrentUser === null || response === null) {
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
	
		if (response.data.data.getInvitationByGroup === null || response === null) {
			return dispatch({
				type: 'GET_OPEN_INVITATION_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'GET_OPEN_INVITATION_SUCCESS',
			invitations: response.data.data.getInvitationByGroup
		})
	}	
}