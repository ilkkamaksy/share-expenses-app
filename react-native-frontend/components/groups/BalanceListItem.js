import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const BalanceListItem = ({ person, debtors, totals }) => {
	
	return (
		<View style={styles.item}>			
			<View style={styles.itemHeader}>
				<Text style={styles.title}>{person.name}</Text>
				<Text style={styles.description}>{`Total expenses: ${Number(totals.totalSpending / 100).toFixed(2)} €`}</Text>
				<Text style={styles.description}>{`Balance: ${Number(totals.balance / 100).toFixed(2)} €`}</Text>
			</View>
            
			
			<View>
				<View style={styles.row}>
					<View style={styles.column}>
						{debtors.filter(debtor => debtor.balance < 0).length > 0 &&  
							<Text style={styles.receivablesTitle}>{`${person.name} owes`}</Text> 
						}
						{debtors.map(item => {
							if (item.balance < 0) {
								return (
									<View key={`receivablesItem-${person.id}-${item.creditor.id}`}>
										<Text style={styles.receivablesItem}>{`${Number(Math.abs(item.balance) / 100).toFixed(2)} € to ${item.creditor.name}`}</Text>
									</View>	
								)
							} 	
						})
						}
					</View>
				</View>
			</View>
			
			
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: Colors.white,
		borderBottomColor: '#ccc',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1,
		marginBottom: 20,
		paddingBottom: 10,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginBottom: 8
	},
	column: {
		width: '50%'
	},
	title: {
		fontSize: 13,
		marginBottom: 6,
		color: Colors.coffee,
		fontWeight: 'bold'
	},
	itemHeader: {
		marginBottom: 10,
		paddingBottom: 10,
	},
	description: {
		fontSize: 12,
		marginBottom: 4,
		color: Colors.coffee,
	},
	receivablesTitle: {
		fontSize: 10,
		marginBottom: 6,
		textTransform: 'uppercase',
		color: Colors.primary,
		fontWeight: 'bold'
	},
	receivablesItem: {
		fontSize: 12,
		color: Colors.coffee
	}
})

BalanceListItem.propTypes = {
	debtors: PropTypes.array,
	person: PropTypes.object,
	totals: PropTypes.object
}

export default BalanceListItem