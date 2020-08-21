import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native'
import { Checkbox, Button } from 'react-native-paper'

import { compareDateDescending, compareDateAscending, compareDescriptionAscending } from '../../utils/sort'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Colors from '../../constants/Colors'
import FilterList from '../../components/icons/FilterList'

import PopupMenuTopRight from '../../components/menus/PopupMenuTopRight'
import ExpenseListItem from '../../components/groups/ExpenseListItem'

const GroupExpensesScreen = ({ 
	groupToEdit
}) => {

	const [modalVisible, setModalVisible] = useState(false)
	const [sortBy, setSortBy] = useState('dateDescending')
	const [selectedSortingText, setSelectedSortingText] = useState('Most recent first')
	
	const onSetSortingOption = (sortingOption) => {
		
		setSortBy(sortingOption.sortBy)
		setModalVisible(!modalVisible)

		if (sortingOption.sortBy === 'dateAscending') {
			setSelectedSortingText('Oldest first')
		} else if (sortingOption.sortBy === 'descriptionAscending') {
			setSelectedSortingText('From A to Z by description')
		} else {
			setSelectedSortingText('Most recent first')
		}
	}

	const group = useSelector(state => state.groups.userGroups.find(group => group.id === groupToEdit.id))

	const comparator = sortBy === 'dateAscending' ? compareDateAscending : sortBy === 'descriptionAscending' ? compareDescriptionAscending : compareDateDescending
	const expenses = group.expenses.sort(comparator)

	return (
		<View style={styles.container}>
			<FlatList 
				data={expenses} 
				keyExtractor={item=> item.id}
				renderItem={itemData => <ExpenseListItem 
					people={group.people}
					expense={itemData.item} 
				/>}
				ListHeaderComponent={
					<View>
						<Hero style={[{ marginBottom: 30 }]}>
							<Heading style={[styles.header]}>
								{`All expenses in group "${group.title}"`}
							</Heading>
							<PopupMenuTopRight />

						</Hero>

						<TouchableOpacity style={styles.sorting} onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.selectedSortingText}>{selectedSortingText}</Text>
							<FilterList size={24} color={Colors.primary} />
						</TouchableOpacity>

						<Modal visible={modalVisible} style={styles.modalView}>
							<View style={styles.modalContent}>

								<Heading style={[styles.modalHeading]}>Sort expenses</Heading>

								<Checkbox.Item 
									label={<Text style={{ fontSize: 14, color: Colors.coffee }}>Most recent first</Text>}
									status={sortBy === 'dateDescending' ? 'checked' : 'unchecked'}
									onPress={() => {
										onSetSortingOption({ sortBy: 'dateDescending' })
									}}
									style={{ paddingLeft: 0 }}
								/>

								<Checkbox.Item 
									label={<Text style={{ fontSize: 14, color: Colors.coffee }}>Oldest first</Text>}
									status={sortBy === 'dateAscending' ? 'checked' : 'unchecked'}
									onPress={() => {
										onSetSortingOption({ sortBy: 'dateAscending' })
									}}
									style={{ paddingLeft: 0 }}
								/>
					
								<Checkbox.Item 
									label={<Text style={{ fontSize: 14, color: Colors.coffee }}>From A to Z by description</Text>}
									status={sortBy === 'descriptionAscending' ? 'checked' : 'unchecked'}
									onPress={() => {
										onSetSortingOption({ sortBy: 'descriptionAscending' })
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

					
					</View>
				}
			/>
			
			
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		color: Colors.white,
		textAlign: 'left',
	},
	intro: {
		textAlign: 'left',
		color: Colors.white,
		fontSize: 17
	},
	container: {
		backgroundColor: Colors.white,
		flex: 1
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%'
	},
	actions: {
		position: 'absolute',
		bottom: 10,
		width: '100%'
	}, 
	actionLinkContainer: {
		backgroundColor: Colors.primary,
		paddingVertical: 4,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center'
	},
	actionLink: {
		textTransform: 'uppercase',
		color: Colors.white,
		fontSize: 10,
		fontWeight: 'bold',
		marginLeft: 4,
		letterSpacing: 0.3
	},
	sorting: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 25,
		paddingBottom: 16,
		borderBottomColor: '#ddd',
		borderBottomWidth: StyleSheet.hairlineWidth,
		maxWidth: 340,
		width: '100%',
		alignSelf: 'center'
	},
	selectedSortingText: {
		color: Colors.lightCoffee,
		fontSize: 13,
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
		fontSize: 13,
		textTransform: 'uppercase',
		textAlign: 'left',
		marginBottom: 5,
		paddingBottom: 20,
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
	},
	subtitle: {
		color: Colors.secondary,
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 16,
		paddingBottom: 10,
		textTransform: 'uppercase',
		textAlign: 'center'
	},
})

GroupExpensesScreen.propTypes = {
	groupToEdit: PropTypes.object,
	removeExpense: PropTypes.func
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const ConnectedGroupExpensesScreen = connect(mapStateToProps, {})(GroupExpensesScreen)

export default ConnectedGroupExpensesScreen