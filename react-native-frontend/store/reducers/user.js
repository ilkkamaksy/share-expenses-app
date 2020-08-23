const initialState = {
	email: '',
	name: '',
	password: '',
	userdata: null,
	fetching: true,
	initialFetchDone: false,
	loginout: false,
	error: '',
	loginFail: false,
	registerFail: false,
	updateUserFail: false
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SET_EMAIL' :
		return {
			...state,
			email: action.email
		}
	case 'SET_PASSWORD' :
		return {
			...state,
			password: action.password
		}
	case 'SET_NAME' :
		return {
			...state,
			name: action.name
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
			email: '',
			name: ''
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
			loginout: true,
			email: '',
			password: '',
			name: ''
		}
	case 'INIT_UPDATE_USER' :
		return {
			...state,
			fetching: true,
			updateUserFail: false,
			error: ''
		}
	case 'UPDATE_USER_SUCCESS' :
		return {
			...state,
			userdata: {
				...state.userdata,
				user: {
					...state.userdata.user,
					email: action.userdata.email
				}
			},
			updateUserFail: false,
			error: '',
			fetching: false,
			password: '',
		}
	case 'UPDATE_USER_FAIL' :
		return {
			...state,
			updateUserFail: true,
			error: action.response,
			fetching: false,
			password: '',
		}
	case 'INIT_GET_CURRENT_USER' :
		return {
			...state,
			fetching: true,
			error: ''
		}
	case 'GET_CURRENT_USER_SUCCESS' :
		return {
			...state,
			error: '',
			fetching: false,
			initialFetchDone: true,
			email: action.user.email ? action.user.email : '',
			name: action.user.name ? action.user.name : ''
		}
	case 'GET_CURRENT_USER_FAIL' :
		return {
			...state,
			error: action.response,
			fetching: false,
			initialFetchDone: true
		}
	default: return state
	}
}

export default userReducer