import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AngleRight from '../icons/AngleRight'

import Colors from '../../constants/Colors'

const GroupListItem = ({ item, onViewDetail }) => {

	const lastUpdatedAt = new Date(JSON.parse(item.lastUpdatedAt))
	const formattedUpdatedAt = `${lastUpdatedAt.toLocaleDateString()} at ${lastUpdatedAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
	
	return (
		<TouchableOpacity onPress={onViewDetail} style={styles.item}>
			<View style={styles.itemContainer}>
				<View style={styles.itemContent}>
					<Text style={styles.location}>{`${item.location}`}</Text>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.lastUpdatedAt}>{`Last updated: ${formattedUpdatedAt}`}</Text>
				</View>
				<AngleRight size={18} color={Colors.lightCoffee} />
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	item: {
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1,
		paddingTop: 14,
		paddingBottom: 16,
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

GroupListItem.propTypes = {
	item: PropTypes.object,
	onViewDetail: PropTypes.func,
	removeGroup: PropTypes.func
}

export default GroupListItem