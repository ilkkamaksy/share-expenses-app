import { AsyncStorage } from 'react-native'
	
import userService from '../../services/userService'
import util from '../../services/util'
// import { emailValidator, passwordValidator } from '../../utils/validate'

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
		
	
		await AsyncStorage.setItem('loggedAppUser', JSON.stringify(response.data.data.register))
	
		util.setToken(response.data.data.register.token)
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
	
	
		await AsyncStorage.setItem('loggedAppUser', JSON.stringify(response.data.data.login))
	
		util.setToken(response.data.data.login.token)
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

const authenticationCheck = () => {
	return async dispatch => {
        
		dispatch({
			type: 'CHECK_IF_ALREADY_AUTHENTICATED',
		})
        
		let userdata = null
		
		let loggedInUser = await AsyncStorage.getItem('loggedAppUser')

		loggedInUser = ''
		if (loggedInUser) {
			userdata = JSON.parse(loggedInUser)
			util.setToken(userdata.token)
		}
		
		dispatch({
			type: 'AUTHENTICATION_CHECK_DONE',
			userdata: userdata
		})
	}
}

const logoutUser = () => {
	return async dispatch => {
		util.setToken('')
		dispatch({
			type: 'LOGGING_OUT'
		})
		
		await window.localStorage.removeItem('loggedAppUser')
		
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