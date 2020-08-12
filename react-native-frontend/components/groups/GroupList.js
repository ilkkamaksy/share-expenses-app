import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native'
import { ActivityIndicator, Checkbox, Button } from 'react-native-paper'

import { getGroups, setGroupToEdit } from '../../store/actions/groups'

import Heading from '../UI/Heading'
import GroupListItem from './GroupListItem'
import FilterList from '../icons/FilterList'

import Colors from '../../constants/Colors'
	
const GroupList = ({ 
	getGroups, 
	fetching, 
	userGroups,
	navigation
}) => {
	
	const [modalVisible, setModalVisible] = useState(false)
	const [sortBy, setSortBy] = useState('lastUpdatedAt')
	const [selectedSortingText, setSelectedSortingText] = useState('Most recently updated first')
	useEffect(() => {
		getGroups()
	}, [])

	const onSetSortingOption = (sortingOption) => {
		getGroups(sortingOption)
		setSortBy(sortingOption.sortBy)
		setModalVisible(!modalVisible)

		if (sortingOption.sortBy === 'createdAt') {
			setSelectedSortingText('Most recently created first')
		} else if (sortingOption.sortBy === 'title') {
			setSelectedSortingText('From A to Z by title')
		} else {
			setSelectedSortingText('Most recently updated first')
		}

	}

	if (fetching) {
		return (
			<ActivityIndicator animating={true} color={Colors.primary} />
		)
	}

	return (
		<View style={styles.container}>
			
			<TouchableOpacity style={styles.sorting} onPress={() => setModalVisible(!modalVisible)}>
				<Text style={styles.selectedSortingText}>{selectedSortingText}</Text>
				<FilterList size={24} color={Colors.primary} />
			</TouchableOpacity>

			<Modal visible={modalVisible} style={styles.modalView}>
				<View style={styles.modalContent}>

					<Heading style={[styles.modalHeading]}>Sort groups</Heading>

					<Checkbox.Item 
						label="Most recently updated first"
						status={sortBy === 'lastUpdatedAt' ? 'checked' : 'unchecked'}
						onPress={() => {
							onSetSortingOption({ sortBy: 'lastUpdatedAt', order: -1 })
						}}
						style={{ paddingLeft: 0 }}
					/>

					<Checkbox.Item 
						label="Most recently created first"
						status={sortBy === 'createdAt' ? 'checked' : 'unchecked'}
						onPress={() => {
							onSetSortingOption({ sortBy: 'createdAt', order: -1 })
						}}
						style={{ paddingLeft: 0 }}
					/>
					
					<Checkbox.Item 
						label="Sort by title From A to Z"
						status={sortBy === 'title' ? 'checked' : 'unchecked'}
						onPress={() => {
							onSetSortingOption({ sortBy: 'title', order: 1 })
						}}
						style={{ paddingLeft: 0 }}
					/>

					<Button 
						style={styles.closeModalButton}
						mode="contained" 
						onPress={() => setModalVisible(!modalVisible)} 
						color={Colors.primary}
						labelStyle={{color: Colors.white}}
					>
                        Close
					</Button>
				</View>
			</Modal>
			
			<FlatList 
				data={userGroups} 
				keyExtractor={item=> item.id}
				renderItem={itemData => <GroupListItem 
					item={itemData.item} 
					onViewDetail={() => {
						navigation.navigate('GroupItem', {
							group: itemData.item
						})
					}}
				/>} 
			/>

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
	},
	modalContent: {
		flex: 1,
		justifyContent: 'flex-start',
		marginVertical: '40%',
		marginHorizontal: 40
	},
	modalView: {
		margin: 0,
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 4,
		paddingVertical: 20,
		paddingHorizontal: 30,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalHeading: {
		fontSize: 18,
		textAlign: 'left',
		marginBottom: 5,
		paddingBottom: 15,
		color: Colors.primary,
		borderBottomColor: '#ddd',
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	sortingOption: {
		paddingVertical: 10,
		borderBottomColor: '#ddd',
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	sortingOptionLabel: {
		fontSize: 14,
		color: Colors.coffee
	},
	closeModalButton: {
		marginTop: 40
	}
})

GroupList.propTypes = {
	navigation: PropTypes.object,
	getGroups: PropTypes.func,
	setGroupToEdit: PropTypes.func,
	removeGroup: PropTypes.func,
	fetching: PropTypes.bool,
	userGroups: PropTypes.array,
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