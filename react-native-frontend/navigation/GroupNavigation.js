import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'
import Colors from '../constants/Colors'
import GroupsOverViewScreen from '../screens/group/GroupsOverviewScreen'
import GroupDetailScreen from '../screens/group/GroupDetailScreen'


const Stack = createStackNavigator()

function GroupNavigation() {
	return (
		<Stack.Navigator
			initialRouteName="Groups"
			headerMode="screen"
			screenOptions={{
				headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
				headerStyle: { 
					backgroundColor: Platform.OS === 'android' ? Colors.primary : '' 
				},
			}}
		>
			<Stack.Screen
				name="GroupList"
				component={GroupsOverViewScreen}
				options={{
					title: 'My Groups',
				}}
			/>

			<Stack.Screen
				name="GroupItem"
				component={GroupDetailScreen}
				options={({route}) => ({ title: route.params.title, id: route.params.id })}
			/>
            
		</Stack.Navigator>
	)
}
  
export default GroupNavigation