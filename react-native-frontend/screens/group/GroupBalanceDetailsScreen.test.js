import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { render } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import calculateTotals from '../../utils/calculateTotals'
import calculateBalances from '../../utils/calculateBalances'

import GroupNavigation from '../../navigation/GroupNavigation'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

jest.mock('react-native-vector-icons')

describe('Testing GroupBalanceDetailsScreen', () => {

	let initialState
	let store
	let component
	let group

	beforeEach(() => {

		const date = new Date(Date.now())

		const expense = {
			id: 'e1',
			amount: 6000,
			groupid: 'g1',
			date: date,
			dateTime: JSON.stringify(date),
			lastUpdatedAt: date,
			createdAt: date,
			description: 'desc',
			people: [
				{ id: 'p1', name: 'person 1'}, 
				{ id: 'p2', name: 'person 2'},
				{ id: 'p3', name: 'person 3'}
			],
			details: [
				{ person: 'p1', share: 2000, paid: 6000, balance: 4000 },
				{ person: 'p2', share: 2000, paid: 0, balance: -2000 },
				{ person: 'p3', share: 2000, paid: 0, balance: -2000 }
			]
		}

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
			expenses: [expense],
		}

		initialState = {
			user: {
				userdata: {
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
				fetching: false,
				error: '',
				saveGroupFail: false,
				getGroupsFail: false,
				groupTotals: calculateTotals(group),
				groupBalanceData: calculateBalances(group)
			},
			navigation: {
				topRightMenuVisible: false
			}
		}

		store = mockStore(initialState)
        
		component = (
			<Provider store={store}>
				<NavigationContainer>
					<GroupNavigation activeScreen="GroupBalanceDetails" />
				</NavigationContainer>        
			</Provider>	
		)
	})

	test('screen contains balance summaries for group members', async () => {

		const { findByText } = render(component)
		const title = await findByText('Balance summary')
		const p1 = await findByText('person 1')
		const p2 = await findByText('person 2')
		const p3 = await findByText('person 3')
    
		expect(title).toBeTruthy()
		expect(p1).toBeTruthy()
		expect(p2).toBeTruthy()
		expect(p3).toBeTruthy()
		
	})

	
})

