import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent } from 'react-native-testing-library'
import { NavigationContainer } from '@react-navigation/native'
import thunk from 'redux-thunk'

import configureStore from 'redux-mock-store'

import GroupNavigation from '../../navigation/GroupNavigation'
import GroupDetailsScreen from './GroupDetailScreen'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

jest.mock('react-native-vector-icons')

describe('Testing GroupDetailsScreen', () => {

	let store
	let component
	let group

	beforeEach(() => {

		group = {
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
		}

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
					group
				],
				groupToEdit: group,
				fetching: false,
				error: '',
				saveGroupFail: false,
				getGroupsFail: false
			},
		})
        
		component = (
			<Provider store={store}>
				<NavigationContainer>
					<GroupNavigation />
				</NavigationContainer>        
			</Provider>	
		)
	})
    
	test('screen contains group overview and recent expenses', async () => {

		const { findByText } = render(component)
		const toClick = await findByText('some group')

		await fireEvent(toClick, 'press')
		
		const overviewTitle = await findByText('Overview')
    
		expect(overviewTitle).toBeTruthy()
		
	})

	// test('clicking a group takes you to the group details screen', async () => {

	// 	const { findByText } = render(component)
	// 	const toClick = await findByText('some group')

	// 	await fireEvent(toClick, 'press')
		
	// 	const subTitle = await findByText('Overview')

	// 	expect(subTitle).toBeTruthy()
	// })

	// test('clicking create group takes you to the create group screen', async () => {

	// 	const { getByA11yLabel, findByText } = render(component)
	// 	const toClick = await getByA11yLabel('Add a new group')

	// 	await fireEvent(toClick, 'press')
		
	// 	const title = await findByText('Add a new group')

	// 	expect(title).toBeTruthy()
	// })
})

