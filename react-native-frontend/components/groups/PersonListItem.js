import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const PersonListItem = ({ item }) => {

	return (
		<View style={styles.item}>
			
			<View style={styles.row}>
				<Text style={styles.title}>{item.name}</Text>
				<View>
					<Text style={item.balance >= 0 ? styles.balancePlus : styles.balanceNegative}>
						{`${Number(item.balance / 100).toFixed(2)} €`}
					</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		borderBottomColor: '#ddd',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1,
		paddingVertical: 12,
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
		fontSize: 13,
		marginBottom: 2,
		color: Colors.lightCoffee
	},
	balancePlus: {
		fontSize: 13,
		marginBottom: 2,
		color: Colors.lightCoffee
	},
	balanceNegative: {
		fontSize: 13,
		marginBottom: 8,
		color: Colors.accent
	}
})

PersonListItem.propTypes = {
	item: PropTypes.object
}

export default PersonListItem