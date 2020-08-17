import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import calculateTotals from '../../utils/calculateTotals'

import GroupNavigation from '../../navigation/GroupNavigation'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

jest.mock('react-native-vector-icons')

describe('Testing GroupDetailsScreen', () => {

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
				expenseToEdit: {
					id: null,
					amount: Number(0).toFixed(2),
					groupid: null,
					date: date,
					dateTime: JSON.stringify(date),
					lastUpdatedAt: date,
					createdAt: date,
					description: 'desc',
					people: [],
					details: []
				},
				groupTotals: [calculateTotals(group)]
			},
			navigation: {
				topRightMenuVisible: false
			},
			invitations: {
				ownedInvitations: [],
				openAccessInvitation: null,
				fetching: false,
			}
		}

		store = mockStore(initialState)
        
		component = (
			<Provider store={store}>
				<NavigationContainer>
					<GroupNavigation activeScreen="GroupItem" />
				</NavigationContainer>        
			</Provider>	
		)
	})
    
	test('screen contains group overview when a group has no expenses', async () => {

		group = {
			...group,
			expenses: []
		}

		initialState = {
			...initialState,
			groups: {
				...initialState.groups,
				userGroups: [group],
				groupToEdit: group
			},
		}

		store = mockStore(initialState)
        
		component = (
			<Provider store={store}>
				<NavigationContainer>
					<GroupNavigation activeScreen="GroupItem" />
				</NavigationContainer>        
			</Provider>	
		)

		const { findByText } = render(component)
		const overviewTitle = await findByText('Overview')
    
		expect(overviewTitle).toBeTruthy()
		
	})

	test('screen contains group overview and recent expenses when a group has expenses', async () => {

		const { findByText } = render(component)
		const overviewTitle = await findByText('Overview')
		const recentExpensesTitle = await findByText('Most recent expense')
		const viewExpensesButton = await findByText('View all expenses')
    
		expect(overviewTitle).toBeTruthy()
		expect(recentExpensesTitle).toBeTruthy()
		expect(viewExpensesButton).toBeTruthy()
		
	})

	test('clicking create expense FAB takes you to the EditExpenseScreen', async () => {

		const { getByA11yLabel, findByText } = render(component)
		const toClick = await getByA11yLabel('Add a new expense')

		await fireEvent(toClick, 'press')
		
		const title = await findByText('Add a new expense')
		const expenseDetailsTitle = await findByText('Expense details')
		const participantsTitle = await findByText('Who were in?')
		const setDateTitle = await findByText('When was this?')

		expect(title).toBeTruthy()
		expect(expenseDetailsTitle).toBeTruthy()
		expect(participantsTitle).toBeTruthy()
		expect(setDateTitle).toBeTruthy()

	})

	test('clicking edit group takes you to the EditGroupScreen', async () => {

		const { findByText } = render(component)
		const toClick = await findByText('Edit Group')

		await fireEvent(toClick, 'press')
		
		const editDetailsTab = await findByText('Edit Details')
		const editPeopleTab = await findByText('Edit People')
		const editUsersTab = await findByText('Edit Users')

		expect(editDetailsTab).toBeTruthy()
		expect(editPeopleTab).toBeTruthy()
		expect(editUsersTab).toBeTruthy()

	})

	test('clicking View all Expenses takes you to the GroupExpensesScreen', async () => {

		const { findByText } = render(component)
		const toClick = await findByText('View all expenses')

		await fireEvent(toClick, 'press')
		
		const title = await findByText('All expenses')

		expect(title).toBeTruthy()

	})
})

