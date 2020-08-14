
import * as SecureStore from 'expo-secure-store'

import userService from '../../services/userService'
import auth from '../../utils/auth'
import '../reducers/user'
// import { emailValidator, passwordValidator } from '../../utils/validate'

export const registerUser = (credentials = null) =>  {
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
		
		await SecureStore.setItemAsync('loggedIn', JSON.stringify(response.data.data.register))
		auth.setToken(response.data.data.register.token)

		dispatch({
			type: 'REGISTER_SUCCESS',
			userdata: response.data.data.register
		})
	}
}

export const loginUser = (credentials = null) =>  {
	
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
	
		await SecureStore.setItemAsync('loggedIn', JSON.stringify(response.data.data.login))
		auth.setToken(response.data.data.login.token)

		dispatch({
			type: 'LOGIN_SUCCESS',
			userdata: response.data.data.login
		})
	}
}

export const setEmail = (email) => {
	return dispatch => {
		dispatch({
			type: 'SET_USERNAME',
			email
		})
	}
}

export const setPassword = (password) => {
	return dispatch => {
		dispatch({
			type: 'SET_PASSWORD',
			password
		})
	}
}

export const authenticationCheck = () => {
	return async dispatch => {
        
		dispatch({
			type: 'CHECK_IF_ALREADY_AUTHENTICATED',
		})
        
		let userdata = null
		// await SecureStore.deleteItemAsync('loggedIn')
		let token = await SecureStore.getItemAsync('loggedIn')

		if (token) {
			userdata = JSON.parse(token)
			auth.setToken(userdata.token)
		}
		
		dispatch({
			type: 'AUTHENTICATION_CHECK_DONE',
			userdata: userdata
		})

	}
}

export const logoutUser = () => {
	return async dispatch => {
		auth.setToken('')
		dispatch({
			type: 'LOGGING_OUT'
		})
		
		await SecureStore.deleteItemAsync('loggedIn')
		
		dispatch({
			type: 'LOGOUT_DONE'
		})
	}
}
