import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ToggleMenu from '../components/menus/ToggleMenu'

import Colors from '../constants/Colors'
import GroupsOverViewScreen from '../screens/group/GroupsOverviewScreen'
import GroupDetailScreen from '../screens/group/GroupDetailScreen'
import EditGroupInfoScreen from '../screens/group/EditGroupInfoScreen'
import EditGroupPeopleScreen from '../screens/group/EditGroupPeopleScreen'
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
				name="EditGroupInfo"
				component={EditGroupInfoScreen}
				options={{
					title: 'Add a new group',
				}}
				
			/>

			<GroupStack.Screen
				name="EditGroupPeople"
				component={EditGroupPeopleScreen}
				options={{
					title: 'Manage group members',
				}}
			/>

			<GroupStack.Screen
				name="EditExpense"
				component={EditExpenseScreen}
				options={{
					title: 'Edit expense',
				}}
			/>
            
		</GroupStack.Navigator>
	)
}

export default GroupNavigator