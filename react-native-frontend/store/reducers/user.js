import userActions from '../actions/user'

export const { registerUser, loginUser, logoutUser, authenticationCheck } = userActions

const initialState = {
	username: '',
	password: '',
	user: null,
	error: null,
	fetching: false,
	loginout: false
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SET_USERNAME' :
		return {
			...state,
			username: action.username
		}
	case 'SET_PASSWORD' :
		return {
			...state,
			password: action.password
		}
	case 'INIT_REGISTER' :
		return {
			...state,
			fetching: true
		}
	case 'REGISTER_SUCCESS' :
		return {
			...state,
			user: action.user,
			error: null,
			fetching: false
		}
	case 'REGISTER_FAIL' :
		return {
			...state,
			error: action.response,
			fetching: false
		}
	case 'INIT_LOGIN' :
		return {
			...state,
			fetching: true
		}
	case 'LOGIN_SUCCESS' :
		return {
			...state,
			user: action.user,
			error: null,
			fetching: false
		}
	case 'LOGIN_FAIL' :
		return {
			...state,
			error: action.response,
			fetching: false
		}
	case 'CHECK_IF_ALREADY_AUTHENTICATED' :
		return {
			...state,
			user: action.user ? action.user : null,
			fetching: true
		}
	case 'AUTHENTICATION_CHECK_DONE' :
		return {
			...state,
			fetching: false
		}
	case 'LOGGING_OUT' :
		return {
			...state,
			user: null,
			loginout: true
		}
	case 'LOGOUT_DONE' :
		return {
			...state,
			loginout: false
		}
	default: return state
	}
}

export default userReducer