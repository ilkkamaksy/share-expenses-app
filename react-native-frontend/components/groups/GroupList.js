import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, View } from 'react-native'
import GroupListItem from './GroupListItem'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'

import { getGroups, removeGroup } from '../../store/reducers/groups'

import FloatingActionButton from '../UI/FloatingActionButton'
import Colors from '../../constants/Colors'

const GroupList = props => {
	
	const { getGroups, removeGroup, navigation, fetching, userGroups } = props

	useEffect(() => {
		getGroups()
	}, [])

	if (fetching) {
		return (
			<ActivityIndicator animating={true} color={Colors.primary} />
		)
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				<FlatList 
					keyExtractor={item=> item.id}
					data={userGroups} 
					renderItem={itemData => <GroupListItem 
						item={itemData.item} 
						removeGroup={removeGroup}
						onViewDetail={() => {
							navigation.navigate('GroupItem', {
								title: itemData.item.title,
								id: itemData.item.id
							})
						}}
					/>} 
				/>
			
			</ScrollView>

			<FloatingActionButton onPress={() => navigation.navigate('EditGroup', {
				title: '',
				id: ''
			})
			} />
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
		removeGroup
	}
)(GroupList)

export default connectedGroupList