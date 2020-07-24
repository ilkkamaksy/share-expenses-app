import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const PersonListItem = props => {

	return (
		<View style={styles.item}>
			<View style={styles.itemContainer}>
				<View style={styles.itemContent}>
					<Text style={styles.title}>{props.person.name}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1,
		paddingTop: 8,
		paddingBottom: 8,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	itemContent: {

	},
	title: {
		fontSize: 16,
		marginBottom: 8,
		fontWeight: 'bold',
		color: Colors.coffee
	},
	lastUpdatedAt: {
		fontSize: 12,
		color: Colors.lightCoffee
	},
	location: {
		fontSize: 10,
		color: Colors.secondary,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		marginBottom: 6
	},
})

PersonListItem.propTypes = {
	person: PropTypes.object
}

export default PersonListItem