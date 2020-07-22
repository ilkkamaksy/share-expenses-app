import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, View } from 'react-native'
import GroupListItem from './GroupListItem'
import { ActivityIndicator } from 'react-native-paper'

import { getGroups, removeGroup, setGroupToEdit } from '../../store/reducers/groups'

import FloatingActionButton from '../UI/FloatingActionButton'
import Colors from '../../constants/Colors'

const GroupList = props => {
	
	const { setGroupToEdit, getGroups, removeGroup, navigation, fetching, userGroups } = props

	useEffect(() => {
		getGroups()
	}, [])

	const createNewGroup = () => {
		setGroupToEdit(null)
		navigation.navigate('EditGroupInfo')
	}

	if (fetching) {
		return (
			<ActivityIndicator animating={true} color={Colors.primary} />
		)
	}

	return (
		<View style={styles.container}>
			
			<FlatList 
				data={userGroups} 
				keyExtractor={item=> item.id}
				renderItem={itemData => <GroupListItem 
					item={itemData.item} 
					removeGroup={removeGroup}
					onViewDetail={() => {
						navigation.navigate('GroupItem', {
							group: itemData.item
						})
					}}
				/>} 
			/>
			
			<FloatingActionButton onPress={createNewGroup} labelText="Add a new group" />
		</View>
		
	) 
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

GroupList.propTypes = {
	navigation: PropTypes.object,
	getGroups: PropTypes.func,
	setGroupToEdit: PropTypes.func,
	removeGroup: PropTypes.func,
	fetching: PropTypes.bool,
	userGroups: PropTypes.array
}

const mapStateToProps = state => {
	return {
		userdata: state.user.userdata,
		fetching: state.groups.fetching,
		error: state.groups.error,
		getGroupsFail: state.groups.getGroupsFail,
		userGroups: state.groups.userGroups
	}
}

const connectedGroupList = connect(
	mapStateToProps, 
	{
		getGroups,
		removeGroup,
		setGroupToEdit
	}
)(GroupList)

export default connectedGroupList