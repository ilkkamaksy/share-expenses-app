import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-native-testing-library'
import configureStore from '../../store/store'
import GroupListItem from './GroupListItem'

describe('GroupListItem test', () => {
    
	test('it should execute with 1 element', () => {
        
		const store = configureStore()

		const component = (
			<Provider store={store}>
				<GroupListItem title="some group" ownerId="u1" id="g1" />
			</Provider>
		)

		const { getAllByText } = render(component)
		const groups = getAllByText('some group')
    
		expect(groups.length).toEqual(1)

	})
})