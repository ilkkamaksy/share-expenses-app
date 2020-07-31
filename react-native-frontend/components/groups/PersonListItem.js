import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const PersonListItem = ({ person, expenses }) => {

	const calculateBalance = (personId) => {
	
		let res = 0 
		
		expenses.forEach(expense => {
			if (expense.details.length === 0) {
				return
			}

			expense.details.forEach(item => {
				if (item.person === personId) {
					res += item.paid - item.share
				}
			})
		})
	
		return <Text style={res >= 0 ? styles.balancePlus : styles.balanceNegative}>{`${Number(res / 100).toFixed(2)} €`}</Text>
	}

	return (
		<View style={styles.item}>
			
			<View style={styles.row}>
				<Text style={styles.title}>{person.name}</Text>
				<View>{calculateBalance(person.id)}</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		borderBottomColor: '#eee',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1,
		paddingTop: 8,
		paddingBottom: 8,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 16,
		marginBottom: 8,
		color: Colors.coffee
	},
	balancePlus: {
		fontSize: 16,
		marginBottom: 8,
	},
	balanceNegative: {
		fontSize: 16,
		marginBottom: 8,
		color: Colors.primary
	}
})

PersonListItem.propTypes = {
	person: PropTypes.object,
	expenses: PropTypes.array
}

export default PersonListItem