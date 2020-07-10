import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../constants/Colors'
import GroupsOverViewScreen from '../screens/group/GroupsOverviewScreen'
import GroupDetailScreen from '../screens/group/GroupDetailScreen'
import Logout from '../components/navigation/Logout'

const HeaderRight = () => {

	const navigation = useNavigation()
    
	return (
		<Icon 
			onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
			name='md-menu' 
			size={23} 
			color={Platform.OS === 'android' ? 'white' : Colors.primary} />
	)
}

const GroupStack = createStackNavigator()

function GroupNavigator() {

	return (
		<GroupStack.Navigator initialRouteName="GroupList"
			headerMode="screen"
			defaultNavigationOptions={{
				headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
				headerStyle: { 
					backgroundColor: Platform.OS === 'android' ? Colors.primary : '' 
				},
			}}
		>

			<GroupStack.Screen
				name="GroupList"
				component={GroupsOverViewScreen}
				options={{
					title: 'My Groups',
					// eslint-disable-next-line react/display-name
					headerRight: () => <HeaderRight />,
				}}
                
			/>

			<GroupStack.Screen
				name="GroupItem"
				component={GroupDetailScreen}
				options={{
					navigation: ({route}) => ({ title: route.params.title, id: route.params.id }),
					// eslint-disable-next-line react/display-name
					headerRight: () => <HeaderRight />
				}}
			/>
            
		</GroupStack.Navigator>
	)
}

const Drawer = createDrawerNavigator()

function DrawerNavigator() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="My Groups" component={GroupNavigator} />
			<Drawer.Screen name="Logout" component={Logout} />
		</Drawer.Navigator>
	)
}

export default DrawerNavigator