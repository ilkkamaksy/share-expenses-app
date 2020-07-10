import userService from '../../services/userService'
import appService from '../../services/appService'

const registerUser = (credentials = null) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_REGISTER',
		})

		const response = await userService.register(credentials)
        
		if (response.data.data === null) {
			return dispatch({
				type: 'REGISTER_FAIL',
				response: response.data.errors[0].message
			})
		}
        
		appService.setToken(response.data.data.register.token)
		dispatch({
			type: 'REGISTER_SUCCESS',
			userdata: response.data.data.register
		})
	}
}

const loginUser = (credentials = null) =>  {
	
	return async dispatch => {

		dispatch({
			type: 'INIT_LOGIN',
		})

		const response = await userService.login(credentials)

		if (response.data.data === null) {
			return dispatch({
				type: 'LOGIN_FAIL',
				response: response.data.errors[0].message
			})
		}
        
		appService.setToken(response.data.data.login.token)
		dispatch({
			type: 'LOGIN_SUCCESS',
			userdata: response.data.data.login
		})
	}
}

const setEmail = (email) => {
	return dispatch => {
		dispatch({
			type: 'SET_USERNAME',
			email
		})
	}
}

const setPassword = (password) => {
	return dispatch => {
		dispatch({
			type: 'SET_PASSWORD',
			password
		})
	}
}

const authenticationCheck = (loggedInUser = '') => {
	return async dispatch => {
        
		dispatch({
			type: 'CHECK_IF_ALREADY_AUTHENTICATED',
		})
        
		let userdata = null
        
		if (loggedInUser) {
			userdata = JSON.parse(loggedInUser)
			appService.setToken(userdata.token)
		}
		
		dispatch({
			type: 'AUTHENTICATION_CHECK_DONE',
			userdata: userdata
		})
	}
}

const logoutUser = () => {
	return async dispatch => {
		appService.setToken('')
		dispatch({
			type: 'LOGGING_OUT'
		})
		dispatch({
			type: 'LOGOUT_DONE'
		})
	}
}

export default {
	registerUser,
	loginUser,
	logoutUser,
	authenticationCheck,
	setPassword,
	setEmail
}