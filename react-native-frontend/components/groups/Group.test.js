import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Group from './Group'

jest.mock('react-native-paper')
jest.mock('react-native-vector-icons')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Group test', () => {

	let store
	let component

	beforeEach(() => {
		store = mockStore({
			groups: {
				userGroups: [
					{
						title: 'some group',
						id: 'g1',
						owner: {
							id: 'u1'
						} 
					}
				],
				groupToEdit: {
					title: '',
					date: new Date(Date.now()),
					location: '',
					people: [],
					users: [],
					id: null
				}
			}
		})
        
		component = (
			<Provider store={store}>
				<Group group={{
					title: 'some group',
					id: 'g1'
				}} 
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