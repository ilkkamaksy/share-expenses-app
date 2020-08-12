import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import WelcomeNavigation from './WelcomeNavigation'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

describe('Testing Welcome navigation', () => {

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
				<NavigationContainer>
					<WelcomeNavigation />
				</NavigationContainer>
			</Provider>
		)
	})
    
	test('page contains the header, register and login buttons', async () => {

		const { findByText } = render(component)

		const header = await findByText('Hey there!')
		const register = await findByText('Register')
		const login = await findByText('Login')
        
		expect(header).toBeTruthy()
		expect(register).toBeTruthy()
		expect(login).toBeTruthy()
		
	})

	test('clicking register takes you to the register screen', async () => {

		const { findByText } = render(component)
		const toClick = await findByText('Register')

		fireEvent(toClick, 'press')
		const newHeader = await findByText('Sign up')

		expect(newHeader).toBeTruthy()
	})
    
	test('clicking login takes you to the login screen', async () => {
    
		const { findByText } = render(component)
		const toClick = await findByText('Login')

		fireEvent(toClick, 'press')
		const newHeader = await findByText('Welcome back')

		expect(newHeader).toBeTruthy()
	})
    
	test('Login screen shown when login has failed', async () => {
    
		store = mockStore({
			user: {
				email: '',
				password: '',
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
				<NavigationContainer>
					<WelcomeNavigation activeScreen='Login' />
				</NavigationContainer>
			</Provider>
		)
        
		const { findByText } = render(component)
		const header = await findByText('Welcome back')

		expect(header).toBeTruthy()
	})
    
	test('Register screen shown when registering has failed', async () => {
    
		store = mockStore({
			user: {
				email: '',
				password: '',
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
				<NavigationContainer>
					<WelcomeNavigation activeScreen='Register' />
				</NavigationContainer>
			</Provider>
		)
        
		const { findByText } = render(component)
		const header = await findByText('Sign up')

		expect(header).toBeTruthy()
	})
    
})

