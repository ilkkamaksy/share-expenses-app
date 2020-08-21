import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Paragraph } from 'react-native-paper'
import { useNavigation  } from '@react-navigation/native'

import { setGroupTotals, setGroupBalanceData } from '../../store/actions/groups'
import { removeExpense } from '../../store/actions/expenses'
import { compareDateDescending } from '../../utils/sort'

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


	const expenses = group.expenses.sort(compareDateDescending)

	return (
		<View style={styles.container}>
			
			<View style={[styles.section, { 
				backgroundColor: '#fbfbfb', 
				paddingTop: 30,
				paddingBottom: 40, 
				paddingHorizontal: 20, 
				borderRadius: 10 
			}]}>
				<Text style={styles.subtitle}>Overview</Text>

				<View style={[styles.row, { borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth }]}>
					<Text style={styles.columnTitle}>Person</Text>
					<Text style={styles.columnTitle}>Balance</Text>
				</View>

				<View style={styles.list}>
					{groupTotals.map(item => {
						return (
							<PersonListItem 
								key={`${item.id}-personListItem`}
								item={item}
							/>
						)
					})}
				</View>

				{group.expenses.length > 0 &&
					<Button 
						labelStyle={styles.summaryButtonLabel}
						mode="contained" 
						color={Colors.primary}
						style={styles.summaryButton}
						onPress={() => navigation.navigate('GroupBalanceDetails', { group: group })}
					>
						View details
					</Button>
				}

			</View>

			{group.expenses.length > 0 ? 
				<View style={[styles.section, { paddingTop: 40, borderTopColor: '#ccc', borderTopWidth: StyleSheet.hairlineWidth }]}>

					<Text style={styles.subtitle}>Most recent expense</Text>
		
					<View style={styles.list}>
						{expenses.slice(0, 1).map(expense => {
							return (
								<ExpenseListItem 
									key={expense.id}
									people={group.people}
									expense={expense} 
									removeExpense={() => removeExpense(expense.id)}
								/>
							)
						})}
					</View>
					<Button 
						labelStyle={styles.summaryButtonLabel}
						style={[styles.summaryButton, { marginBottom: 20 }]}
						mode="contained" 
						color={Colors.primary}
						onPress={() => navigation.navigate('GroupExpenses', { group: group })}
					>
						View all expenses
					</Button>
				</View>
				:
				<View style={styles.section}>
					<Text style={[styles.subtitle, { marginBottom: 0 }]}>No expenses yet</Text>
					<Paragraph style={[{ 
						textAlign: 'center', 
						fontSize: 13, 
						marginBottom: 5, 
						color: Colors.lightCoffee, 
						lineHeight: 20 
					}]}>
						Add an expense to get started!
					</Paragraph>
				</View>
			}
			
			
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
		marginBottom: 30
	},
	columnTitle: {
		fontSize: 13,
		marginBottom: 12,
		fontWeight: 'bold',
		color: Colors.coffee
	},
	subtitle: {
		color: Colors.primary,
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 16,
		paddingBottom: 10,
		textTransform: 'uppercase',
		textAlign: 'center'
	},
	summaryButton: {
		borderRadius: 8
	},
	summaryButtonLabel: {
		fontSize: 11,
		fontWeight: 'bold',
		color: Colors.white,	
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