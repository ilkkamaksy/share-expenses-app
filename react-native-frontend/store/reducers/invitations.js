const initialState = {
	ownedInvitations: [],
	openAccessInvitation: null,
	referrerUrl: null,
	fetching: false,
	error: ''	
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
			error: '',
			fetching: true
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
			openAccessInvitation: action.invitation
		}
	case 'GET_OPEN_INVITATION_FAIL' :
		return {
			...state,
			error: action.response,
			fetching: false
		}
	case 'INIT_ACCEPT_INVITATION' :
		return {
			...state,
			fetching: true,
			error: ''
		}
	case 'ACCEPT_INVITATION_SUCCESS' :
		return {
			...state,
			error: '',
			fetching: false,
			openAccessInvitation: initialState.openAccessInvitation,
			referrerUrl: initialState.referrerUrl,
		}
	case 'ACCEPT_INVITATION_FAIL' :
		return {
			...state,
			error: action.response,
			fetching: false
		}
	case 'REJECT_INVITATION' :
		return {
			...state,
			openAccessInvitation: initialState.openAccessInvitation,
			referrerUrl: initialState.referrerUrl,
		}
	case 'SET_REFERRER_URL' : 
		return {
			...state,
			referrerUrl: action.referrerUrl
		}
	default: return state
	}
}

export default inviteReducer