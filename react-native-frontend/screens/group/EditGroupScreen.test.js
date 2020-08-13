import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import GroupNavigation from '../../navigation/GroupNavigation'

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
		const editDetailsLabel = await findByText('Edit Group details')
		const editDetailsTab = await findByText('Edit Details')
		const editPeopleTab = await findByText('Edit People')
		const editUsersTab = await findByText('Edit Users')

		expect(editDetailsLabel).toBeTruthy()
		expect(editDetailsTab).toBeTruthy()
		expect(editPeopleTab).toBeTruthy()
		expect(editUsersTab).toBeTruthy()
		
	})

	test('clicking Edit People changes tab to Editing People', async () => {

		const { findByText } = render(component)
		const toClick = await findByText('Edit People')

		await fireEvent(toClick, 'press')
		
		const formLabel = await findByText('Add a new person to this group')
		const listLabel = await findByText('People in this group')
		
		expect(formLabel).toBeTruthy()
		expect(listLabel).toBeTruthy()

	})

	test('clicking Edit Users changes tab to Editing Users', async () => {

		const { findByText } = render(component)
		const toClick = await findByText('Edit Users')

		await fireEvent(toClick, 'press')
		
		const formLabel = await findByText('Invite a friend to this group')
		const listLabel = await findByText('Friends managing this group')
		
		expect(formLabel).toBeTruthy()
		expect(listLabel).toBeTruthy()

	})

	test('clicking Edit Details changes tab to Editing Details', async () => {

		const { findByText } = render(component)
		const toClickA = await findByText('Edit Users')
		const toClickB = await findByText('Edit Details')
		await fireEvent(toClickA, 'press')
		await fireEvent(toClickB, 'press')
		
		const formLabel = await findByText('Edit Group details')
		
		expect(formLabel).toBeTruthy()

	})

})

