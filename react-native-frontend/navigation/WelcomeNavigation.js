import React from 'react'
import PropTypes from 'prop-types'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'

import Colors from '../constants/Colors'
import RegisterScreen from '../screens/user/RegisterScreen'
import LoginScreen from '../screens/user/LoginScreen'
import SplashScreen from '../screens/splash/SplashScreen'

const WelcomeStack = createStackNavigator()

const WelcomeNavigator = ({ activeScreen = 'Splash' }) => {

	return (
		<WelcomeStack.Navigator
			initialRouteName={activeScreen}
			headerMode="screen"
			screenOptions={{
				headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
				headerStyle: { 
					backgroundColor: Platform.OS === 'android' ? Colors.primary : '' 
				},
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
