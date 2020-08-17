import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation  } from '@react-navigation/native'

import { setGroupTotals, setGroupBalanceData } from '../../store/actions/groups'
import { removeExpense } from '../../store/actions/expenses'

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
	
	useEffect(() => {
		setGroupTotals(group)
		setGroupBalanceData(group)
	}, [group])


	return (
		<View style={styles.container}>
			
			<View style={styles.section}>
				<Text style={styles.subtitle}>Overview</Text>

				<View style={[styles.row, { borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth }]}>
					<Text style={styles.columnTitle}>Person</Text>
					<Text style={styles.columnTitle}>Balance</Text>
				</View>

				<View style={styles.personList}>
					{groupTotals.map(item => {
						return (
							<PersonListItem 
								key={`${item.id}-personListItem`}
								item={item}
							/>
						)
					})}
				</View>

				<Button 
					labelStyle={styles.summaryButton}
					mode="text" 
					color={Colors.primary}
					onPress={() => navigation.navigate('GroupBalanceDetails', { group: group })}
				>
					View balance details
				</Button>

			</View>

			<View style={styles.section}>

				{group.expenses.length > 0 && <Text style={styles.subtitle}>Most recent expense</Text>}
			
				{group.expenses.reverse().slice(0, 1).map(expense => {
					return (
						<ExpenseListItem 
							key={expense.id}
							people={group.people}
							expense={expense} 
							removeExpense={() => removeExpense(expense.id)}
						/>
					)
				})}
			
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
	personList: {
		marginBottom: 20
	},
	list: {
		marginBottom: 20
	},
	columnTitle: {
		fontSize: 13,
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
		fontSize: 11,
		fontWeight: 'bold',
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