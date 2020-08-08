import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ToggleMenu from '../components/menus/ToggleMenu'

import Colors from '../constants/Colors'
import GroupsOverViewScreen from '../screens/group/GroupsOverviewScreen'
import GroupDetailScreen from '../screens/group/GroupDetailScreen'
import GroupBalanceDetailsScreen from '../screens/group/GroupBalanceDetailsScreen'

import CreateGroupScreen from '../screens/group/CreateGroupScreen'
import AddGroupPeopleScreen from '../screens/group/AddGroupPeopleScreen'
import EditGroupScreen from '../screens/group/EditGroupScreen'
import EditExpenseScreen from '../screens/group/EditExpenseScreen'

const GroupStack = createStackNavigator()

function GroupNavigator() {

	return (
		<GroupStack.Navigator 
			initialRouteName="GroupList"
			headerMode="screen"
			screenOptions={{
				headerTitle: '',
				headerTintColor: Colors.white,
				headerStyle: { 
					backgroundColor: Colors.primary,
					shadowColor: 'transparent',
					elevation: 0,
					borderBottomWidth: 0,
				},
				// eslint-disable-next-line react/display-name
				headerRight: () => <ToggleMenu />,
			}}
		>

			<GroupStack.Screen
				name="GroupList"
				component={GroupsOverViewScreen}
				options={{
					title: 'My Groups',	
				}}
                
			/>

			<GroupStack.Screen
				name="GroupItem"
				component={GroupDetailScreen}
				options={{
					navigation: ({route}) => ({ group: route.params.group }),
				}}
			/>

			<GroupStack.Screen
				name="CreateGroup"
				component={CreateGroupScreen}
				options={{
					title: 'Add a new group',
				}}				
			/>

			<GroupStack.Screen
				name="AddGroupPeople"
				component={AddGroupPeopleScreen}
				options={{
					title: 'Add people to your new group',
				}}				
			/>

			<GroupStack.Screen
				name="EditGroup"
				component={EditGroupScreen}
				options={{
					title: 'Edit group',
				}}				
			/>

			<GroupStack.Screen
				name="EditExpense"
				component={EditExpenseScreen}
				options={{
					title: 'Edit expense',
				}}
			/>

			<GroupStack.Screen
				name="GroupBalanceDetails"
				component={GroupBalanceDetailsScreen}
				options={{
					navigation: ({route}) => ({ group: route.params.group }),
				}}
			/>
            
		</GroupStack.Navigator>
	)
}

export default GroupNavigator