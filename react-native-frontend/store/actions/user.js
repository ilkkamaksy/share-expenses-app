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
        
		window.localStorage.setItem('loggedAppUser', JSON.stringify(response.data.data.register))
		appService.setToken(response.data.data.register.token)
		dispatch({
			type: 'REGISTER_SUCCESS',
			user: response.data.data.register
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
        
		window.localStorage.setItem('loggedAppUser', JSON.stringify(response.data.data.login))
		appService.setToken(response.data.data.login.token)
		dispatch({
			type: 'LOGIN_SUCCESS',
			user: response.data.data.login
		})
	}
}

const setUsername = (e) => {
	return dispatch => {
		dispatch({
			type: 'SET_USERNAME',
			username: e.target.value
		})
	}
}

const setPassword = (e) => {
	return dispatch => {
		dispatch({
			type: 'SET_PASSWORD',
			password: e.target.value
		})
	}
}

const authenticationCheck = () => {
	return async dispatch => {
		const loggedInUserJSON = await window.localStorage.getItem('loggedAppUser')
		let userdata = null
		if (loggedInUserJSON) {
			userdata = JSON.parse(loggedInUserJSON)
			appService.setToken(userdata.token)
		}
		dispatch({
			type: 'CHECK_IF_ALREADY_AUTHENTICATED',
			user: userdata
		})
		dispatch({
			type: 'AUTHENTICATION_CHECK_DONE',
		})
	}
}

const logoutUser = () => {
	return async dispatch => {
		await window.localStorage.removeItem('loggedAppUser')
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
	setUsername
}