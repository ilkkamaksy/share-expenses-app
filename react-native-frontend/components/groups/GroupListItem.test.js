import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import GroupListItem from './GroupListItem'

jest.mock('react-native-paper')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('GroupListItem test', () => {
	
	let store
	let component

	beforeEach(() => {
		store = mockStore({
			userGroups: [
				{
					title: 'some group',
					id: 'g1',
					owner: {
						id: 'u1',
						email: 'a@a.a'
					},
					lastUpdatedAt: JSON.stringify('1595323349236'),
					location: 'somewhere'

				},
				{
					title: 'some group 2',
					id: 'g2',
					owner: {
						id: 'u1',
						email: 'a@a.a'
					},
					lastUpdatedAt: JSON.stringify('1595323349236'),
					location: 'elsewhere'
				}
			]
		})
        
		component = (
			<Provider store={store}>
				<GroupListItem item={store.getState().userGroups[0]} />
			</Provider>
		)
	})

	test('it should execute with 1 element', () => {
        
		const { getAllByText } = render(component)
		const groups = getAllByText('some group')
    
		expect(groups.length).toEqual(1)

	})
})