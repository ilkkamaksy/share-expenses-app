import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const PersonListItem = ({ item }) => {

	return (
		<View style={styles.item}>
			
			<View style={styles.row}>
				<Text style={styles.title}>{item.person.name}</Text>
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
	item: PropTypes.object
}

export default PersonListItem