import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import GroupNavigator from './navigation/GroupNavigation'
import { NavigationContainer } from '@react-navigation/native'

import groupsReducer from './store/reducers/groups'

const rootReducer = combineReducers({
	groups: groupsReducer
})

const store = createStore(rootReducer)

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<GroupNavigator />
			</NavigationContainer>
		</Provider>
	)
}