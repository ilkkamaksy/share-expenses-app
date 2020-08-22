import React from 'react'
import PropTypes from 'prop-types'
import { createStackNavigator } from '@react-navigation/stack'

import ToggleMenu from '../components/menus/ToggleMenu'

import Colors from '../constants/Colors'
import GroupsOverViewScreen from '../screens/group/GroupsOverviewScreen'
import GroupDetailScreen from '../screens/group/GroupDetailScreen'
import GroupBalanceDetailsScreen from '../screens/group/GroupBalanceDetailsScreen'

import CreateGroupScreen from '../screens/group/CreateGroupScreen'
import AddGroupPeopleScreen from '../screens/group/AddGroupPeopleScreen'
import EditGroupScreen from '../screens/group/EditGroupScreen'
import InviteScreen from '../screens/group/InviteScreen'
import EditExpenseScreen from '../screens/group/EditExpenseScreen'
import GroupExpensesScreen from '../screens/group/GroupExpensesScreen'

const GroupStack = createStackNavigator()

function GroupNavigation({ activeScreen = 'GroupList' }) {

	return (
		<GroupStack.Navigator 
			initialRouteName={activeScreen}
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
			/>

			<GroupStack.Screen
				name="GroupItem"
				component={GroupDetailScreen}
			/>

			<GroupStack.Screen
				name="GroupExpenses"
				component={GroupExpensesScreen}
			/>

			<GroupStack.Screen
				name="CreateGroup"
				component={CreateGroupScreen}
			/>

			<GroupStack.Screen
				name="AddGroupPeople"
				component={AddGroupPeopleScreen}
			/>

			<GroupStack.Screen
				name="EditGroup"
				component={EditGroupScreen}
			/>

			<GroupStack.Screen
				name="InviteScreen"
				component={InviteScreen}
			/>

			<GroupStack.Screen
				name="EditExpense"
				component={EditExpenseScreen}
			/>

			<GroupStack.Screen
				name="GroupBalanceDetails"
				component={GroupBalanceDetailsScreen}
			/>
            
		</GroupStack.Navigator>
	)
}

GroupNavigation.propTypes = {
	activeScreen: PropTypes.string
}

export default GroupNavigation