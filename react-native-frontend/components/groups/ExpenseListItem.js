import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation  } from '@react-navigation/native'
import { Button } from 'react-native-paper'

import { removeExpense, setExpenseToEdit } from '../../store/actions/expenses'

import Colors from '../../constants/Colors'

const ExpenseListItem = ({ 
	people, 
	expense, 
	groupToEdit, 
	removeExpense, 
	setExpenseToEdit 
}) => {

	const navigation = useNavigation()

	const getPersonName = (person) => {
		return people.find(p => p.id === person).name
	}

	const formatDate = (date) => {
		const dateObj = new Date(JSON.parse(date))
		return `${dateObj.toLocaleDateString()} at ${dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
	}

	const onEditExpense = () => {
		setExpenseToEdit({
			...expense,
			groupid: expense.group,
			dateTime: new Date(JSON.parse(expense.dateTime)),
			people: expense.details.map(detail => {
				return groupToEdit.people.find(person => person.id === detail.person)
			}),
		})
		navigation.navigate('EditExpense')
	}

	return (
		<View style={styles.item}>			
			<View>
				<Text style={styles.title}>{expense.description}</Text>
				<Text style={styles.date}>{`Date: ${formatDate(expense.dateTime)}`}</Text>
				<Text style={styles.amount}>{`Total amount: ${Number(expense.amount / 100).toFixed(2)} €`}</Text>
				
			</View>
			{expense.details.map(item => {
				return (
					<View key={item.person}>
						<Text style={styles.columnTitle}>{getPersonName(item.person)}</Text>
						<View style={styles.expenseDetailsContainer}>
							<Text numberOfLines={1} style={styles.expenseDetail}>{`Share: ${Number(item.share / 100).toFixed(2)} €`}</Text>
							<Text numberOfLines={1} style={styles.expenseDetail}>{`Paid: ${Number(item.paid / 100).toFixed(2)} €`}</Text>
							<Text numberOfLines={1} style={styles.expenseDetail}>{`Balance: ${Number((item.paid - item.share) / 100).toFixed(2)} €`}</Text>
						</View>
					</View>

				)
			})}
			<Button 
				onPress={() => removeExpense(expense.id)} 
				mode="text"
				color={Colors.primary}
				labelStyle={{ fontSize: 10 }}
			>
				Delete
			</Button>
			<Button 
				onPress={() => onEditExpense()} 
				mode="text"
				color={Colors.primary}
				labelStyle={{ fontSize: 10 }}
			>
				Edit
			</Button>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: Colors.white,
		borderBottomColor: '#eee',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1,
		padding: 30,
		marginBottom: 20,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
		borderRadius: 4,
		shadowColor: '#666',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		
		elevation: 3,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: 8
	},
	column: {
		width: '30%'
	},
	title: {
		fontSize: 13,
		marginBottom: 6,
		color: Colors.coffee,
		fontWeight: 'bold',
		textTransform: 'capitalize'
	},
	date: {
		fontSize: 12,
		color: Colors.lightCoffee,
		marginBottom: 5,
	},
	amount: {
		fontSize: 12,
		marginBottom: 15,
		paddingBottom: 15,
		color: Colors.lightCoffee,
		borderBottomColor: '#bbb',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	columnTitle: {
		fontSize: 13,
		marginBottom: 10,
		color: Colors.coffee,
		fontWeight: 'bold'
	},
	expenseDetailsContainer: {
		marginBottom: 20
	},
	expenseDetail: {
		fontSize: 12,
		marginBottom: 6,
		color: Colors.lightCoffee,
	},
})

ExpenseListItem.propTypes = {
	expense: PropTypes.object,
	groupToEdit: PropTypes.object,
	people: PropTypes.array,
	removeExpense: PropTypes.func,
	setExpenseToEdit: PropTypes.func
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}
const ConnectedExpenseListItem = connect(mapStateToProps, {
	removeExpense,
	setExpenseToEdit
})(ExpenseListItem)

export default ConnectedExpenseListItem