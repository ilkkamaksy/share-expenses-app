import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const BalanceListItem = ({ data }) => {

	return (
		<View style={styles.item}>			
			<View style={styles.itemHeader}>
				<Text style={styles.title}>{data.person.name}</Text>
				<Text style={styles.description}>{`Total spending: ${Number(data.totalSpending / 100).toFixed(2)} €`}</Text>
				<Text style={styles.description}>{`Balance: ${Number(data.balance / 100).toFixed(2)} €`}</Text>
			</View>
            
			{data.balance > 0
				? <View>
					<View style={styles.row}>
						<View style={styles.column}>
							<Text style={styles.receivablesTitle}>Receivables</Text>
							<Text style={styles.receivablesItem}>{`${Number(data.balance / 100).toFixed(2)} €`}</Text>
						</View>

						<View style={styles.column}>
							<Text style={styles.receivablesTitle}>From</Text>
							{data.debtors.map((item, index) => {
								if (item.debt < 0) {
									return (
										<View key={`receivablesItem-${item.id}-${index}`}>
											<Text style={styles.receivablesItem}>{`${Number(Math.abs(item.debt) / 100).toFixed(2)} € from ${item.name}`}</Text>
										</View>	
									)	
								}
							})
							}
						</View>
					</View>
				</View>
				: <Text style={[styles.receivablesTitle, { color: Colors.lightCoffee }]}>No receivables</Text>
			}
			
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
		fontSize: 14,
		marginBottom: 6,
		color: Colors.coffee,
		fontWeight: 'bold'
	},
	itemHeader: {
		marginBottom: 10,
		paddingBottom: 10,
	},
	description: {
		fontSize: 13,
		marginBottom: 4,
		color: Colors.coffee,
	},
	columnTitle: {
		fontSize: 13,
		marginBottom: 8,
		color: Colors.coffee,
		fontWeight: 'bold'
	},
	receivablesTitle: {
		fontSize: 10,
		textTransform: 'uppercase',
		marginBottom: 6,
		letterSpacing: 1,
		color: Colors.secondary,
		fontWeight: 'bold'
	},
	receivablesItem: {
		fontSize: 13,
		color: Colors.coffee
	}
})

BalanceListItem.propTypes = {
	expense: PropTypes.object,
	people: PropTypes.array,
	data: PropTypes.object
}

export default BalanceListItem