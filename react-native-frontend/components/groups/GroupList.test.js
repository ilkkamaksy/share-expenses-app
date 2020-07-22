import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import GroupList from './GroupList'

jest.mock('react-native-paper')
jest.mock('react-native-vector-icons')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)


const createTestProps = (props) => ({
	navigation: {
		navigate: jest.fn()
	},
	...props
})

describe('GroupList test', () => {

	let store
	let component
	let props

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
					},
					{
						title: 'some group',
						id: 'g2',
						owner: {
							id: 'u1'
						} 
					},
					{
						title: 'some group',
						id: 'g3',
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
				},
				fetching: false,
				error: '',
				saveGroupFail: false,
				getGroupsFail: false
			},
			user: {
				userdata: {
					id: 'u1',
					email: 'test@test.com'
				}
			}
		})
        
		props = createTestProps({})

		component = (
			<Provider store={store}>
				<GroupList {...props} />
			</Provider>
		)
	})
    
	test('it should execute with 3 groups', async () => {
        
		const { getAllByText } = render(component)
		const groups = await getAllByText('some group')
    
		expect(groups.length).toEqual(3)

	})
    
	test('tapping a group navigates to GroupItem screen', async () => {
        
		const { getAllByText } = render(component)
		const groups = await getAllByText('some group')

		fireEvent(groups[0], 'press')
		expect(props.navigation.navigate).toHaveBeenCalledWith('GroupItem', { group: { id: 'g1', owner: { id: 'u1' }, title: 'some group'}})

	})
    
	
    
})