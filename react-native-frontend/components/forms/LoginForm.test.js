import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import LoginForm from './LoginForm'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
 
describe('test LoginForm dispatch actions', () => {
    
	let store
	let component
 
	beforeEach(() => {
		store = mockStore({
			user: {
				email: '',
				password: '',
				userdata: null,
				fetching: true,
				loginout: false,
				error: '',
				loginFail: false,
				registerFail: false
			}
		})
        
		component = (
			<Provider store={store}>
				<LoginForm />
			</Provider>
		)
	})

	it('should dispatch INIT_LOGIN action on login button click', async () => {

		const { findByText } = render(component)
		const toClick = await findByText('Login')

		fireEvent(toClick, 'press')
        
		const expectedActions = [ { type: 'INIT_LOGIN' } ]
        
		const actions = await store.getActions()
		expect(actions).toEqual(expectedActions)

	})
    
	it('should dispatch SET_USERNAME and SET_PASSWORD on input value change', async () => {

		const { getByA11yLabel } = render(component)
		const emailInput = await getByA11yLabel('Email')
		const passwordInput = await getByA11yLabel('Password')
		expect(emailInput).toBeTruthy()
		expect(passwordInput).toBeTruthy()

		fireEvent.changeText(emailInput, 'test@email.com')
		fireEvent.changeText(passwordInput, 'testPassword')
        
		const expectedActions = [
			{ type: 'SET_USERNAME', email: 'test@email.com' },
			{ type: 'SET_PASSWORD', password: 'testPassword' }
		]
        
		const actions = await store.getActions()
		
		expect(actions).toEqual(expectedActions)
		
	})
    
	it('should dispatch SET_USERNAME, SET_PASSWORD and INIT_LOGIN on submit', async () => {

		const { getByA11yLabel, findByText } = render(component)
		const emailInput = await getByA11yLabel('Email')
		const passwordInput = await getByA11yLabel('Password')
		expect(emailInput).toBeTruthy()
		expect(passwordInput).toBeTruthy()

		fireEvent.changeText(emailInput, 'test@email.com')
		fireEvent.changeText(passwordInput, 'testPassword')
        
		const toClick = await findByText('Login')
		fireEvent(toClick, 'press')
        
		const expectedActions = [
			{ type: 'SET_USERNAME', email: 'test@email.com' },
			{ type: 'SET_PASSWORD', password: 'testPassword' },
			{ type: 'INIT_LOGIN' }
		]
        
		const actions = await store.getActions()
		expect(actions).toEqual(expectedActions)

	})
})

describe('test LoginForm error handling', () => {
    
	let store
	let component
 
	beforeEach(() => {
		store = mockStore({
			user: {
				email: 'abc',
				password: 'abcd',
				userdata: null,
				fetching: false,
				loginout: false,
				error: 'Error message',
				loginFail: true,
				registerFail: false
			}
		})
        
		component = (
			<Provider store={store}>
				<LoginForm />
			</Provider>
		)
	})

	it('should display error message on failed login', async () => {

		const { findByText } = render(component)
		const message = await findByText('Error message')
		expect(message).toBeTruthy()

	})
    
	it('should populate fields with entered values when login has failed', async () => {

		const { getByA11yLabel } = render(component)
		const emailInput = await getByA11yLabel('Email')
		const passwordInput = await getByA11yLabel('Password')
        
		expect(emailInput.props.value).toEqual('abc')
		expect(passwordInput.props.value).toEqual('abcd')

	})	
})