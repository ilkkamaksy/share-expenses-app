import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent } from 'react-native-testing-library'
import thunk from 'redux-thunk'

import configureStore from 'redux-mock-store'

import AppNavigation from './AppNavigation'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

jest.mock('react-native-vector-icons')

import * as groupService from '../../services/groupService'
jest.mock('../../services/groupService')

describe('Testing AppNavigation when user not logged in', () => {

	let store
	let component
 
	beforeEach(() => {
		store = mockStore({
			user: {
				email: '',
				password: '',
				userdata: null,
				fetching: false,
				loginout: false,
				error: '',
				loginFail: false,
				registerFail: false
			},
			invitations: {
				ownedInvitations: [],
				openAccessInvitation: null,
				fetching: false,
			}
		})
        
		component = (
			<Provider store={store}>
				<AppNavigation />
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
			},
			invitations: {
				ownedInvitations: [],
				openAccessInvitation: null,
				fetching: false,
			}
		})
        
		component = (
			<Provider store={store}>
				<AppNavigation />
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
			},
			invitations: {
				ownedInvitations: [],
				openAccessInvitation: null,
				fetching: false,
			}
		})
        
		component = (
			<Provider store={store}>
				<AppNavigation />
			</Provider>
		)
        
		const { findByText } = render(component)
		const header = await findByText('Sign up')

		expect(header).toBeTruthy()
	})
    
})

describe('Testing AppNavigation when user is logged in', () => {

	let store
	let component
 
	beforeEach(() => {
		store = mockStore({
			user: {
				email: '',
				password: '',
				userdata: {
					token: 'faketoken',
					user: {
						id: 'u1',
						email: 'a@a.a'
					}
				},
				fetching: false,
				loginout: false,
				error: '',
				loginFail: false,
				registerFail: false
			},
			groups: {
				userGroups: [
					{
						title: 'some group',
						id: 'g1',
						owner: {
							id: 'u1'
						},
						lastUpdatedAt: JSON.stringify('1595398910709'),
						people: [
							{ id: 'u1', name: 'person 1' },
							{ id: 'u2', name: 'person 2' },
							{ id: 'u3', name: 'person 3' }
						],
						expenses: []
					},
				],
				groupToEdit: {
					title: '',
					date: new Date(Date.now()),
					location: '',
					people: [],
					users: [],
					id: null
				},
				fetching: false,
				error: '',
				saveGroupFail: false,
				getGroupsFail: false
			},
			navigation: {
				topRightMenuVisible: false
			},
			invitations: {
				ownedInvitations: [],
				openAccessInvitation: null,
				fetching: false,
			}
		})
		
		component = (
			<Provider store={store}>
				<AppNavigation />
			</Provider>
		)
	})
    
	test('screen contains list of groups', async () => {

		const { getAllByText, findByText } = render(component)
		const title = await findByText('My groups')
		const groups = await getAllByText('some group')
		
		expect(groups.length).toEqual(1)
		expect(title).toBeTruthy()	
		
	})
	
})

