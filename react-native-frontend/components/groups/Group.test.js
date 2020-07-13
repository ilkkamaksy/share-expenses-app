import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Group from './Group'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Group test', () => {

	let store
	let component

	beforeEach(() => {
		store = mockStore({
			userGroups: [
				{
					title: 'some group',
					id: 'g1',
					ownerId: 'u1'
				}
			]
		})
        
		component = (
			<Provider store={store}>
				<Group title="some group" ownerId="u1" id="g1" />
			</Provider>
		)
	})
    
	test('it should execute with 1 element', () => {
        
		const { getAllByText } = render(component)
		const groups = getAllByText('some group')
    
		expect(groups.length).toEqual(1)

	})
})