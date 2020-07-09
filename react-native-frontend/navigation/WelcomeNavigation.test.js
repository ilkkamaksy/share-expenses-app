import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent } from 'react-native-testing-library'

import configureStore from '../store/store'
import WelcomeNavigation from './WelcomeNavigation'

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

describe('Testing Welcome navigation', () => {
	test('page contains the header, register and login buttons', async () => {

		const store = configureStore()

		const component = (
			<Provider store={store}>
				<NavigationContainer>
					<WelcomeNavigation />
				</NavigationContainer>
			</Provider>
		)

		const { findByText, findAllByText } = render(component)

		const header = await findByText('Share Expenses app')
		const register = await findByText('Register')
		const login = await findByText('Login')
        
        expect(header).toBeTruthy()
		expect(register).toBeTruthy()
		expect(login).toBeTruthy()
		
	})

	test('clicking register takes you to the register screen', async () => {
        
		const store = configureStore()

		const component = (
			<Provider store={store}>
				<NavigationContainer>
					<WelcomeNavigation />
				</NavigationContainer>
			</Provider>
		)
		
		const { findByText } = render(component)
		const toClick = await findByText('Register')

		fireEvent(toClick, 'press')
		const newHeader = await findByText('Sign up')

		expect(newHeader).toBeTruthy()
    })
    
    test('clicking login takes you to the login screen', async () => {
        
		const store = configureStore()

		const component = (
			<Provider store={store}>
				<NavigationContainer>
					<WelcomeNavigation />
				</NavigationContainer>
			</Provider>
		)
		
		const { findByText } = render(component)
		const toClick = await findByText('Login')

		fireEvent(toClick, 'press')
		const newHeader = await findByText('Login to your account')

		expect(newHeader).toBeTruthy()
	})
})