import React from 'react'
import { FlatList, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'
import GroupListItem from '../../components/groups/GroupListItem'
import { ScrollView } from 'react-native-gesture-handler'

const GroupsOverViewScreen = props => {
	const groups = useSelector(state => state.groups.userGroups)
	return (
		<ScrollView>
			<FlatList 
				data={groups} 
				renderItem={itemData => <GroupListItem 
					title={itemData.item.title} 
					id={itemData.item.id}
					ownerId={itemData.item.ownerId}
					onViewDetail={() => {
						props.navigation.navigate('GroupItem', {
							title: itemData.item.title,
							id: itemData.item.id
						})
					}}
				/>} 
			/>
		</ScrollView>
	) 
}

export default GroupsOverViewScreen