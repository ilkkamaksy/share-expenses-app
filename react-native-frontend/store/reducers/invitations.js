const initialState = {
	ownedInvitations: [],
	receivedInvitation: null
}

const inviteReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'INIT_ADD_INVITATION' :
		return {
			...state,
			fetching: true,
			error: ''
		}
	case 'ADD_INVITATION_SUCCESS' :
		return {
			...state,
			error: '',
			fetching: false,
			ownedInvitations: [...state.ownedInvitations, action.invitation],
		}
	case 'ADD_INVITATION_FAIL' :
		return {
			...state,
			error: action.response,
			fetching: false
		}
	case 'INIT_REMOVE_INVITATION' :
		return {
			...state,
			fetching: true,
			error: ''
		}
	case 'REMOVE_INVITATION_SUCCESS' :
		return {
			...state,
			error: '',
			fetching: false,
			ownedInvitations: state.ownedInvitations.filter(invite => invite.id !== action.invitation.id),
		}
	case 'REMOVE_INVITATION_FAIL' :
		return {
			...state,
			error: action.response,
			fetching: false
		}
	case 'INIT_GET_OWNED_INVITATIONS' :
		return {
			...state,
			error: ''
		}
	case 'GET_OWNED_INVITATIONS_SUCCESS' :
		return {
			...state,
			error: '',
			fetching: false,
			ownedInvitations: action.invitations,
		}
	case 'GET_OWNED_INVITATIONS_FAIL' :
		return {
			...state,
			error: action.response,
			fetching: false
		}
	case 'INIT_GET_OPEN_INVITATION' :
		return {
			...state,
			fetching: true,
			error: ''
		}
	case 'GET_OPEN_INVITATION_SUCCESS' :
		return {
			...state,
			error: '',
			fetching: false,
			receivedInvitations: action.invitation
		}
	case 'GET_OPEN_INVITATION_FAIL' :
		return {
			...state,
			error: action.response,
			fetching: false
		}
	default: return state
	}
}

export default inviteReducer