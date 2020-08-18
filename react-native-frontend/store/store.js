import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import groupsReducer from './reducers/groups'
import userReducer from './reducers/user'
import inviteReducer from './reducers/invitations'
import navReducer from './reducers/nav'

const appReducer = combineReducers({
	groups: groupsReducer,
	user: userReducer,
	invitations: inviteReducer,
	navigation: navReducer
})

const rootReducer = (state, action) => {
	if (action.type === 'LOGOUT_DONE') {
		state = {
			...state,
			groups: undefined,
			navigation: undefined
		}
	}
  
	return appReducer(state, action)
}

export default function configureStore() {
	return createStore(rootReducer, applyMiddleware(thunk))
}