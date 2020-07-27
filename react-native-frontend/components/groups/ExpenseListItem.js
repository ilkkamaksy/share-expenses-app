import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const ExpenseListItem = ({ people, expense }) => {

	const getPersonName = (person) => {
		return people.find(p => p.id === person).name
	}

	return (
		<View style={styles.item}>			
			<View>
				<Text style={styles.title}>{expense.description}</Text>
				<Text style={styles.description}>{`Total amount: ${Number(expense.amount / 100).toFixed(2)} €`}</Text>
			</View>
			{expense.details.map(item => {
				return (
					<View key={item.person}>
						<Text style={styles.columnTitle}>{getPersonName(item.person)}</Text>
						<View style={styles.row}>
							<Text style={[styles.expenseDetail, styles.column]}>{`Share: ${item.share}`}</Text>
							<Text style={[styles.expenseDetail, styles.column]}>{`Paid: ${item.paid}`}</Text>
							<Text style={[styles.expenseDetail, styles.column]}>{`Balance: ${parseFloat(item.paid - item.share)}`}</Text>
						</View>
					</View>

				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#fafafa',
		borderBottomColor: '#eee',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1,
		padding: 30,
		marginBottom: 20,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
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
		fontSize: 14,
		marginBottom: 6,
		color: Colors.coffee,
		fontWeight: 'bold'
	},
	description: {
		fontSize: 13,
		marginBottom: 10,
		paddingBottom: 10,
		color: Colors.coffee,
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	columnTitle: {
		fontSize: 13,
		marginBottom: 8,
		color: Colors.coffee,
		fontWeight: 'bold'
	},
	expenseDetail: {
		fontSize: 13,
		marginBottom: 6,
		color: Colors.coffee,
	},
})

ExpenseListItem.propTypes = {
	expense: PropTypes.object,
	people: PropTypes.array
}

export default ExpenseListItem