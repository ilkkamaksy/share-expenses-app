import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import GroupListItem from './GroupListItem'
import { ActivityIndicator } from 'react-native-paper'
import FilterList from '../icons/FilterList'

import { getGroups, setGroupToEdit } from '../../store/reducers/groups'

import FloatingActionButton from '../UI/FloatingActionButton'
import Colors from '../../constants/Colors'

const GroupList = props => {
	
	const { setGroupToEdit, getGroups, navigation, fetching, userGroups } = props

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
			<View style={styles.sorting}>
				<TouchableOpacity onPress={() => console.log('pressed')}>
					<Text style={styles.selectedSortingText}>Most recently updated</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => console.log('pressed')}>
					<FilterList size={24} color={Colors.primary} />
				</TouchableOpacity>
			</View>
			
			<FlatList 
				data={userGroups} 
				keyExtractor={item=> item.id}
				renderItem={itemData => <GroupListItem 
					item={itemData.item} 
					onViewDetail={() => {
						setGroupToEdit(itemData.item)
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
	sorting: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
		paddingBottom: 10,
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	selectedSortingText: {
		color: Colors.coffee,
		fontSize: 14,
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
		setGroupToEdit
	}
)(GroupList)

export default connectedGroupList