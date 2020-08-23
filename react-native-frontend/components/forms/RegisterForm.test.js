import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import RegisterForm from './RegisterForm'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
 
describe('test RegisterForm dispatch actions', () => {
    
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
				<RegisterForm />
			</Provider>
		)
	})

	it('should dispatch INIT_REGISTER action on submit', async () => {

		const { findByText } = render(component)
		const toClick = await findByText('Sign up!')

		fireEvent(toClick, 'press')
        
		const expectedActions = [ { type: 'INIT_REGISTER' } ]
        
		const actions = await store.getActions()
		expect(actions).toEqual(expectedActions)

	})
    
	it('should dispatch SET_EMAIL and SET_PASSWORD on input value change', async () => {

		const { getByA11yLabel } = render(component)
		const emailInput = await getByA11yLabel('Email')
		const passwordInput = await getByA11yLabel('Password')
		expect(emailInput).toBeTruthy()
		expect(passwordInput).toBeTruthy()

		fireEvent.changeText(emailInput, 'test@email.com')
		fireEvent.changeText(passwordInput, 'testPassword')
        
		const expectedActions = [
			{ type: 'SET_EMAIL', email: 'test@email.com' },
			{ type: 'SET_PASSWORD', password: 'testPassword' }
		]
        
		const actions = await store.getActions()
		
		expect(actions).toEqual(expectedActions)
		
	})
    
	it('should dispatch SET_EMAIL, SET_PASSWORD and INIT_REGISTER on submit', async () => {

		const { getByA11yLabel, findByText } = render(component)
		const emailInput = await getByA11yLabel('Email')
		const passwordInput = await getByA11yLabel('Password')
		expect(emailInput).toBeTruthy()
		expect(passwordInput).toBeTruthy()

		fireEvent.changeText(emailInput, 'test@email.com')
		fireEvent.changeText(passwordInput, 'testPassword')
        
		const toClick = await findByText('Sign up!')
		fireEvent(toClick, 'press')
        
		const expectedActions = [
			{ type: 'SET_EMAIL', email: 'test@email.com' },
			{ type: 'SET_PASSWORD', password: 'testPassword' },
			{ type: 'INIT_REGISTER' }
		]
        
		const actions = await store.getActions()
		expect(actions).toEqual(expectedActions)

	})
})

describe('test RegisterForm error handling', () => {
    
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
				loginFail: false,
				registerFail: true
			}
		})
        
		component = (
			<Provider store={store}>
				<RegisterForm />
			</Provider>
		)
	})

	it('should display error message on failed Register', async () => {

		const { findByText } = render(component)
		const message = await findByText('Error message')
		expect(message).toBeTruthy()

	})
    
	it('should populate fields with entered values when registering has failed', async () => {

		const { getByA11yLabel } = render(component)
		const emailInput = await getByA11yLabel('Email')
		const passwordInput = await getByA11yLabel('Password')
        
		expect(emailInput.props.value).toEqual('abc')
		expect(passwordInput.props.value).toEqual('abcd')

	})	
})