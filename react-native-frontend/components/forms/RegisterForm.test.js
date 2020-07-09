import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent } from 'react-native-testing-library'
import configureStore from 'redux-mock-store'

import RegisterForm from './RegisterForm'
import { registerUser } from '../../store/reducers/user'

const mockStore = configureStore([])
 
describe('test RegisterForm', () => {
    
	let store
	let component
 
	beforeEach(() => {
		store = mockStore({
			user: {
				email: '',
				password: '',
				userdata: null,
				fetching: true,
				loginout: false,
				error: '',
				loginFail: false,
				registerFail: false
			}
		})
        
		store.dispatch = jest.fn()

		component = (
			<Provider store={store}>
				<RegisterForm />
			</Provider>
		)
	})

	it('should dispatch an action on button click', async () => {
		
		const { findByText } = render(component)
		const toClick = await findByText('Sign up!')

		fireEvent(toClick, 'press')
        
		expect(store.dispatch).toHaveBeenCalledTimes(1)
		// expect(store.dispatch).toHaveBeenCalledWith(
		// 	loginUser({ email: '', password: '' })
		// )        
	})
})