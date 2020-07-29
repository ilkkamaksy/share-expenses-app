import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const BalanceListItem = ({ data, people }) => {

	const getPersonName = (personId) => {
		return people.find(person => person.id === personId).name
	}

	return (
		<View style={styles.item}>			
			<View>
				<Text style={styles.title}>{getPersonName(data.personId)}</Text>
				<Text style={styles.description}>{`Total spending: ${Number(data.totalSpending).toFixed(2)} €`}</Text>
			</View>
            
			<View>
				<View style={styles.row}>
					<Text style={[styles.expenseDetail, styles.column]}>{`Receivables: ${Number(data.receivables).toFixed(2)} €`}</Text>
					<Text style={[styles.expenseDetail, styles.column]}>{`From: ${data.debtors.map(person => getPersonName(person))}`}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: Colors.white,
		borderBottomColor: '#eee',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1,
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

BalanceListItem.propTypes = {
	expense: PropTypes.object,
	people: PropTypes.array,
	data: PropTypes.object
}

export default BalanceListItem