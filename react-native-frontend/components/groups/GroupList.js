import React from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import GroupListItem from './GroupListItem'
import { ScrollView } from 'react-native-gesture-handler'

import FloatingActionButton from '../UI/FloatingActionButton'

const GroupList = ({navigation}) => {
    
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
						navigation.navigate('GroupItem', {
							title: itemData.item.title,
							id: itemData.item.id
						})
					}}
				/>} 
			/>
			<FloatingActionButton />
		</ScrollView>
	) 
}

GroupList.propTypes = {
	navigation: PropTypes.object
}

export default GroupList