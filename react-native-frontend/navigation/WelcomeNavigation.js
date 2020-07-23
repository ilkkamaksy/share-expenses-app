import React from 'react'
import PropTypes from 'prop-types'
import { createStackNavigator } from '@react-navigation/stack'

import RegisterScreen from '../screens/user/RegisterScreen'
import LoginScreen from '../screens/user/LoginScreen'
import SplashScreen from '../screens/splash/SplashScreen'

const WelcomeStack = createStackNavigator()

const WelcomeNavigator = ({ activeScreen = 'Splash' }) => {

	return (
		<WelcomeStack.Navigator
			initialRouteName={activeScreen}
			screenOptions={{
				headerShown: false
			}}
		>

			<WelcomeStack.Screen
				name="Splash"
				component={SplashScreen}
				options={{
					title: 'Share Expenses app',
				}}
			/>

			<WelcomeStack.Screen
				name="Register"
				component={RegisterScreen}
				options={{
					title: 'Sign up',
				}}
			/>

			<WelcomeStack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'Login to your account',
				}}
			/>
            
		</WelcomeStack.Navigator>
	)
}

WelcomeNavigator.propTypes = {
	activeScreen: PropTypes.string
}

export default WelcomeNavigator
