import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Group from './Group'

jest.mock('react-native-paper')
jest.mock('react-native-vector-icons')

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
	return {
		...jest.requireActual('@react-navigation/native'),
		useNavigation: () => ({
			navigate: mockedNavigate,
		}),
	}
})

jest.mock('./ExpenseListItem', () => () => 'ExpenseListItem')
jest.mock('./PersonListItem', () => () => 'PersonListItem')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Group test', () => {

	let store
	let component

	beforeEach(() => {

		const expense = {
			id: 'e1',
			groupid: 'g1',
			date: null,
			lastUpdatedAt: null,
			createdAt: null,
			description: 'desc',
			amount: Number(10).toFixed(2),
			people: [
				{ id: 'p1', name: 'person 1' }
			],
			details: []
		}

		const group = {
			title: 'some group',
			id: 'g1',
			owner: {
				id: 'u1'
			}, 
			location: 'somewhere',
			people: [
				{ id: 'p1', name: 'person 1' }
			],
			users: [
				{ id: 'u1', email: 'a@a.fi' }
			],
			lastUpdatedAt: null,
			createdAt: null,
			expenses: [expense],

		}

		store = mockStore({
			groups: {
				userGroups: [{ ...group }],
				groupTotals: []
			}
		})
        
		component = (
			<Provider store={store}>
				<Group group={group} 
				/>
			</Provider>
		)
	})
    
	test('it should execute with 1 element', () => {
        
		const { getAllByText } = render(component)
		const groups = getAllByText('Overview')
    
		expect(groups.length).toEqual(1)

	})
})