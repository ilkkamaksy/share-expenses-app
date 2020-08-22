import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import GroupNavigation from '../../navigation/GroupNavigation'
import { act } from 'react-test-renderer'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

jest.mock('react-native-vector-icons')

describe('Testing EditGroupScreen', () => {

	let initialState
	let store
	let component
	let group

	beforeEach(() => {

		const date = new Date(Date.now())

		group = {
			title: 'some group',
			id: 'g1',
			owner: {
				id: 'u1'
			},
			lastUpdatedAt: date,
			createdAt: date,
			people: [
				{ id: 'p1', name: 'person 1' },
				{ id: 'p2', name: 'person 2' },
				{ id: 'p3', name: 'person 3' }
			],
			users: [],
			expenses: []
		}

		initialState = {
			user: {
				userdata: {
					token: 'faketoken',
					user: {
						id: 'u1',
						email: 'a@a.a'
					}
				},
			},
			groups: {
				userGroups: [
					group
				],
				groupToEdit: group,
				currentPerson: '',
				fetching: false,
				error: '',
				saveGroupFail: false,
				getGroupsFail: false,
			},
			invitations: {
				ownedInvitations: [],
				openAccessInvitation: null,
				fetching: false,
				error: ''
			},
			navigation: {
				topRightMenuVisible: false
			}
		}

		store = mockStore(initialState)
        
		component = (
			<Provider store={store}>
				<NavigationContainer>
					<GroupNavigation activeScreen="EditGroup" />
				</NavigationContainer>        
			</Provider>	
		)
	})
    

	test('screen contains initially form for editing group details and tabs for editing group details, people and users', async () => {

		const { findByText } = render(component)
		const editDetailsLabel = await findByText('Group details')
		const editDetailsTab = await findByText('General')
		const editPeopleTab = await findByText('Edit people')
		const editUsersTab = await findByText('Group Users')

		expect(editDetailsLabel).toBeTruthy()
		expect(editDetailsTab).toBeTruthy()
		expect(editPeopleTab).toBeTruthy()
		expect(editUsersTab).toBeTruthy()
		
	})

	test('clicking Edit people changes tab to Editing People', async () => {

		const { findByText } = render(component)
		const toClick = await findByText('Edit people')

		await act(async () => {
			await fireEvent(toClick, 'press')
		})
		
		const formLabel = await findByText('Add a new person to this group')
		
		expect(formLabel).toBeTruthy()

	})

	test('clicking Group Users changes tab to Editing Users', async () => {

		const { findByText } = render(component)
		const toClick = await findByText('Group Users')

		await act(async () => {
			await fireEvent(toClick, 'press')
		})
		
		const formLabel = await findByText('Invite friends')
		
		expect(formLabel).toBeTruthy()

	})

	test('clicking General changes tab to Editing Details', async () => {

		const { findByText } = render(component)
		const toClickA = await findByText('Group Users')
		const toClickB = await findByText('General')

		await act(async () => {
			await fireEvent(toClickA, 'press')
		})

		await act(async () => {
			await fireEvent(toClickB, 'press')
		})

		const formLabel = await findByText('Group details')
		
		expect(formLabel).toBeTruthy()

	})

})

