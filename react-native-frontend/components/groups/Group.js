import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation  } from '@react-navigation/native'

import { removeExpense, setGroupTotals, setGroupBalanceData } from '../../store/actions/groups'

import Colors from '../../constants/Colors'

import PersonListItem from './PersonListItem'
import ExpenseListItem from './ExpenseListItem'

const Group = ({ 
	group, 
	groupTotals, 
	setGroupTotals, 
	setGroupBalanceData, 
	removeExpense 
}) => {

	const navigation = useNavigation()
	
	console.log('group', group)
	
	useEffect(() => {
		setGroupTotals(group)
		setGroupBalanceData(group)
	}, [group])


	return (
		<View style={styles.container}>
			
			<View style={styles.section}>
				<Text style={styles.subtitle}>Overview</Text>

				<View style={styles.row}>
					<Text style={styles.columnTitle}>Person</Text>
					<Text style={styles.columnTitle}>Balance</Text>
				</View>

				<FlatList 
					data={groupTotals} 
					style={styles.list}
					keyExtractor={item=> `${item.id}-personListItem`}
					renderItem={itemData => <PersonListItem 
						item={itemData.item} 
					/>} 
				/>

				<Button 
					labelStyle={styles.summaryButton}
					mode="text" 
					color={Colors.primary}
					onPress={() => navigation.navigate('GroupBalanceDetails', { group: group })}
				>
					View summary
				</Button>

			</View>

			<View style={styles.section}>

				{group.expenses.length > 0 && <Text style={styles.subtitle}>Recent expenses</Text>}
			
				<FlatList 
					data={group.expenses.reverse().slice(0, 3)} 
					maxToRenderPerBatch={3}
					keyExtractor={item=> item.id}
					renderItem={itemData => <ExpenseListItem 
						people={group.people}
						expense={itemData.item} 
						removeExpense={() => removeExpense(itemData.item.id)}
					/>} 
				/>

				<Button 
					labelStyle={styles.summaryButton}
					mode="text" 
					color={Colors.primary}
					onPress={() => navigation.navigate('GroupExpenses', { group: group })}
				>
					View all expenses
				</Button>
			</View>
			
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		marginBottom: 50
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	list: {
		marginBottom: 20
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
	summaryButton: {
		fontSize: 12,
		fontWeight: 'bold'
	}
})

Group.propTypes = {
	group: PropTypes.object,
	onViewDetail: PropTypes.func,
	navigation: PropTypes.object,
	groupToEdit: PropTypes.object,
	groupTotals: PropTypes.array,
	removeExpense: PropTypes.func,
	setGroupTotals: PropTypes.func,
	setGroupBalanceData: PropTypes.func
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit,
		groupTotals: state.groups.groupTotals
	}
}

const connectedGroup = connect(mapStateToProps, {
	removeExpense,
	setGroupTotals,
	setGroupBalanceData
})(Group)

export default connectedGroup