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

		group = {
			title: '',
			id: null,
			owner: null,
			lastUpdatedAt: null,
			createdAt: null,
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
		}

		store = mockStore(initialState)
        
		component = (
			<Provider store={store}>
				<NavigationContainer>
					<GroupNavigation activeScreen="CreateGroup" />
				</NavigationContainer>        
			</Provider>	
		)
	})
    
	test('screen contains form to edit group title', async () => {

		const { findByText } = render(component)
		const title = await findByText('Add a new group')
		const introText = await findByText('Add a name and an optional location for your group.')
		const formLabel = await findByText('Edit Group details')

		expect(title).toBeTruthy()
		expect(introText).toBeTruthy()
		expect(formLabel).toBeTruthy()


	})

})

