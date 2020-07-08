import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

import GroupNavigator from './navigation/GroupNavigation'
import WelcomeNavigator from './navigation/WelcomeNavigation'
import groupsReducer from './store/reducers/groups'
import userReducer from './store/reducers/user'

const rootReducer = combineReducers({
	groups: groupsReducer,
	user: userReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  
	const storeState = store.getState()

	return (
		<Provider store={store}>
			<NavigationContainer>
				{storeState.user.user === null ? (
					<WelcomeNavigator />
				) : (
					<GroupNavigator />
				) 
				} 
			</NavigationContainer>
		</Provider>
	)
}