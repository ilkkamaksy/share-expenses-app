import React from 'react'
import { FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux'
import GroupListItem from '../../components/groups/GroupListItem'

const GroupsOverViewScreen = props => {
	const groups = useSelector(state => state.groups.userGroups)
	return (
		<FlatList 
			data={groups} 
			keyExtractor={group => group.id} 
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
	) 
}

export default GroupsOverViewScreen