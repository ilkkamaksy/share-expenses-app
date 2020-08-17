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

describe('Testing CreateGroupScreen', () => {

	let initialState
	let store
	let component
	let group

	beforeEach(() => {

		const date = new Date(Date.now())

		group = {
			title: 'new group',
			id: 'g1',
			owner: {
				id: 'u1'
			},
			lastUpdatedAt: date,
			createdAt: date,
			people: [],
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
				userGroups: [],
				groupToEdit: group,
				currentPerson: '',
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
					<GroupNavigation activeScreen="AddGroupPeople" />
				</NavigationContainer>        
			</Provider>	
		)
	})
    
	test('screen contains form to add a new person to the group and a list of added people', async () => {

		const { findByText } = render(component)
		const title = await findByText('Add people to your new group')
		const formLabel = await findByText('Add a new person to this group')
		const listLabel = await findByText('People in this group')

		expect(title).toBeTruthy()
		expect(formLabel).toBeTruthy()
		expect(listLabel).toBeTruthy()

	})

})

