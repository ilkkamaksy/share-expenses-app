import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import groupsReducer from './reducers/groups'
import userReducer from './reducers/user'

const rootReducer = combineReducers({
	groups: groupsReducer,
	user: userReducer
})

export default function configureStore() {
	return createStore(rootReducer, applyMiddleware(thunk))
}