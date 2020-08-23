
import * as SecureStore from 'expo-secure-store'

import * as userService from '../../services/userService'
import auth from '../../utils/auth'
import '../reducers/user'
// import { emailValidator, passwordValidator } from '../../utils/validate'

export const registerUser = (credentials = null) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_REGISTER',
		})

		const response = await userService.register(credentials)
        
		if (!response || response.data.errors) {
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

		if (!response || response.data.errors) {
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
			type: 'SET_EMAIL',
			email
		})
	}
}

export const setName = (name) => {
	return dispatch => {
		dispatch({
			type: 'SET_NAME',
			name
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

export const updateUser = (userdata) => {
	return async dispatch => {
		
		dispatch({
			type: 'INIT_UPDATE_USER'
		})
		
		const response = await userService.updateUser(userdata)
        
		if (!response || response.data.errors) {
			return dispatch({
				type: 'UPDATE_USER_FAIL',
				response: response.data.errors[0].message
			})
		}
		
		dispatch({
			type: 'UPDATE_USER_SUCCESS',
			userdata: response.data.data.updateUser
		})
	}	
}

export const removeUser = () => {
	return async dispatch => {
		
		dispatch({
			type: 'INIT_UPDATE_USER'
		})

		const response = await userService.removeUser()
        
		if (!response || response.data.errors) {
			return dispatch({
				type: 'UPDATE_USER_FAIL',
				response: response.data.errors[0].message
			})
		}
		
		auth.setToken('')
		await SecureStore.deleteItemAsync('loggedIn')

		dispatch({
			type: 'REMOVE_USER_SUCCESS',
			userdata: null
		})
	}	
}

export const getCurrentUser = () => {
	return async dispatch => {
		
		dispatch({
			type: 'INIT_GET_CURRENT_USER'
		})
		
		const response = await userService.me()
		
		if (!response || response.data.errors) {
			return dispatch({
				type: 'GET_CURRENT_USER_FAIL',
				response: response.data.errors[0].message
			})
		}
		
		dispatch({
			type: 'GET_CURRENT_USER_SUCCESS',
			user: response.data.data.me
		})
	}	
}