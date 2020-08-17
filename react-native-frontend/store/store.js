import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import groupsReducer from './reducers/groups'
import userReducer from './reducers/user'
import inviteReducer from './reducers/invitations'
import navReducer from './reducers/nav'

const rootReducer = combineReducers({
	groups: groupsReducer,
	user: userReducer,
	invitations: inviteReducer,
	navigation: navReducer
})

export default function configureStore() {
	return createStore(rootReducer, applyMiddleware(thunk))
}