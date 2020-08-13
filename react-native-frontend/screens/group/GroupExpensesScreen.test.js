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

describe('Testing GroupExpensesScreen', () => {

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
				{ id: 'p1', name: 'Person 1'}, 
				{ id: 'p2', name: 'Person 2'},
				{ id: 'p3', name: 'Person 3'}
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
			expenses: [expense]
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
					<GroupNavigation activeScreen="GroupExpenses" />
				</NavigationContainer>        
			</Provider>	
		)
	})
    
	test('screen contains a list of expenses', async () => {
 
		const { getAllByText, findByText } = render(component)
		const title = await findByText('All expenses')
		const expenses = await getAllByText('Remove expense')
		
		expect(expenses.length).toEqual(1)
		expect(title).toBeTruthy()	
		
	})
})

