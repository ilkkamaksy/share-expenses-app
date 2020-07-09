import React from 'react'
import { Provider } from 'react-redux'

import configureStore from './store/store'
import AppNavigation from './components/navigation/AppNavigation'


const store = configureStore()

export default function App() {

	return (
		<Provider store={store}>
			<AppNavigation />
		</Provider>
	)
}