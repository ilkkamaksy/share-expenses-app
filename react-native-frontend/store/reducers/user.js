const initialState = {
	email: '',
	password: '',
	userdata: null,
	fetching: true,
	loginout: false,
	error: '',
	loginFail: false,
	registerFail: false
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SET_USERNAME' :
		return {
			...state,
			email: action.email
		}
	case 'SET_PASSWORD' :
		return {
			...state,
			password: action.password
		}
	case 'INIT_REGISTER' :
		return {
			...state,
			fetching: true,
			registerFail: false,
			error: ''
		}
	case 'REGISTER_SUCCESS' :
		return {
			...state,
			userdata: action.userdata,
			registerFail: false,
			error: '',
			fetching: false,
			password: '',
			email: ''
		}
	case 'REGISTER_FAIL' :
		return {
			...state,
			registerFail: true,
			error: action.response,
			fetching: false
		}
	case 'INIT_LOGIN' :
		return {
			...state,
			fetching: true,
			loginFail: false,
			error: ''
            
		}
	case 'LOGIN_SUCCESS' :
		return {
			...state,
			userdata: action.userdata,
			loginFail: false,
			error: '',
			fetching: false,
			password: '',
			email: ''
		}
	case 'LOGIN_FAIL' :
		return {
			...state,
			loginFail: true,
			error: action.response,
			fetching: false
		}
	case 'CHECK_IF_ALREADY_AUTHENTICATED' :
		return {
			...state,
			fetching: true
		}
	case 'AUTHENTICATION_CHECK_DONE' :
		return {
			...state,
			userdata: action.userdata ? action.userdata : null,
			fetching: false
		}
	case 'LOGGING_OUT' :
		return {
			...state,
			userdata: null,
			loginout: true
		}
	default: return state
	}
}

export default userReducer