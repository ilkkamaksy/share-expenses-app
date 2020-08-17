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

import * as groupService from '../../services/groupService'
jest.mock('../../services/groupService')

describe('Testing GroupsOverviewScreen', () => {

	let initialState
	let store
	let component
	let group

	beforeEach(() => {

		const date = new Date(Date.now())

		group = {
			title: 'some group',
			id: 'g1',
			lastUpdatedAt: JSON.stringify(date),
			createdAt: JSON.stringify(date),
			expenses: []
		}

		const groupToEdit = {
			title: '',
			id: null,
			owner: null,
			lastUpdatedAt: null,
			createdAt: null,
			people: [],
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
				groupToEdit,
				fetching: false,
				error: '',
				saveGroupFail: false,
				getGroupsFail: false,
			},
			navigation: {
				topRightMenuVisible: false
			}
		}

		store = mockStore(initialState)
        
		component = (
			<Provider store={store}>
				<NavigationContainer>
					<GroupNavigation activeScreen="GroupList" />
				</NavigationContainer>        
			</Provider>	
		)
	})
    
	test('screen contains a list of groups', async () => {
 
		const { getAllByText, findByText } = render(component)
		const title = await findByText('My groups')
		const groups = await getAllByText('some group')
		
		expect(groups.length).toEqual(1)
		expect(title).toBeTruthy()	
		expect(groupService.getGroups).toHaveBeenCalledTimes(1)
		
	})

	test('clicking "create new group" FAB takes you to the CreateGroupScreen', async () => {

		const { getByA11yLabel, findByText } = render(component)
		const toClick = await getByA11yLabel('Add a new group')

		await fireEvent(toClick, 'press')
		
		const title = await findByText('Add a new group')
		const introText = await findByText('Add a name and an optional location for your group.')
		const formLabel = await findByText('Edit Group details')

		expect(title).toBeTruthy()
		expect(introText).toBeTruthy()
		expect(formLabel).toBeTruthy()

	})
})

