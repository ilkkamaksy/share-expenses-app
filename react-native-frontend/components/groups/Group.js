import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

import Colors from '../../constants/Colors'
import Edit from '../icons/Edit'

import FloatingActionButton from '../UI/FloatingActionButton'
import PersonListItem from './PersonListItem'
import ExpenseListItem from './ExpenseListItem'

const Group = ({ group, navigation }) => {

	console.log(group)

	const onEditGroup = () => {	
		navigation.navigate('EditGroupInfo')
	}

	return (
		<View style={styles.container}>
			
			<View style={styles.actions}>
				<View>
					<TouchableOpacity onPress={onEditGroup} style={styles.actionLinkContainer}>
						<Edit size={14} color={Colors.white} />
						<Text style={styles.actionLink}>Edit</Text>
					</TouchableOpacity>
				</View>
				
			</View>
			
			<Text style={styles.subtitle}>Overview</Text>

			<View style={styles.row}>
				<Text style={styles.columnTitle}>Person</Text>
				<Text style={styles.columnTitle}>Balance</Text>
			</View>

			<FlatList 
				data={group.people} 
				style={styles.list}
				keyExtractor={item=> item.id}
				renderItem={itemData => <PersonListItem 
					person={itemData.item} 
					expenses={group.expenses}
				/>} 
			/>

			<Text style={styles.subtitle}>Recent expenses</Text>
			
			<FlatList 
				data={group.expenses} 
				keyExtractor={item=> item.id}
				renderItem={itemData => <ExpenseListItem 
					people={group.people}
					expense={itemData.item} 
				/>} 
			/>
			
			<FloatingActionButton onPress={() => navigation.navigate('EditExpense')} />
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	list: {
		marginBottom: 40
	},
	columnTitle: {
		fontSize: 14,
		marginBottom: 12,
		fontWeight: 'bold',
		color: Colors.coffee
	},
	subtitle: {
		color: Colors.secondary,
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 16,
		paddingBottom: 10,
		textTransform: 'uppercase'
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		top: -65
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
		marginLeft: 4
	}
})

Group.propTypes = {
	group: PropTypes.object,
	onViewDetail: PropTypes.func,
	navigation: PropTypes.object,
	groupToEdit: PropTypes.object,
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const connectedGroup = connect(mapStateToProps, {})(Group)

export default connectedGroup