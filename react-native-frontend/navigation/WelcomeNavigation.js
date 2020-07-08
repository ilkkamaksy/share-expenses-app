import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'

import Colors from '../constants/Colors'
import RegisterScreen from '../screens/user/RegisterScreen'
import LoginScreen from '../screens/user/LoginScreen'
import SplashScreen from '../screens/splash/SplashScreen'

const Stack = createStackNavigator()

function GroupNavigation() {

	return (
		<Stack.Navigator
			initialRouteName="Splash"
			headerMode="screen"
			screenOptions={{
				headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
				headerStyle: { 
					backgroundColor: Platform.OS === 'android' ? Colors.primary : '' 
				},
			}}
		>

			<Stack.Screen
				name="Splash"
				component={SplashScreen}
				options={{
					title: 'Share Expenses app',
				}}
			/>

			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{
					title: 'Sign up',
				}}
			/>

			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'Login',
				}}
			/>
            
		</Stack.Navigator>
	)
}
  
export default GroupNavigation
