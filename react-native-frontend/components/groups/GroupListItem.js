import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'

const GroupListItem = ({ title, id, ownerId, onViewDetail }) => {
	return (
		<TouchableOpacity onPress={onViewDetail}>
			<View style={styles.group}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text>{id}</Text>
					<Text>{ownerId}</Text>
				</View>
				<View style={styles.actions}>
					<Button color={Colors.primary} title="view" onPress={onViewDetail} />
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	group: {
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 4,
		backgroundColor: 'white',
		margin: 10
	},
	textContainer: {
		margin: 10
	},
	title: {
		fontSize: 18,
		marginBottom: 8
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 10
	}
})

GroupListItem.propTypes = {
	title: PropTypes.string,
	id: PropTypes.string,
	ownerId: PropTypes.string,
	onViewDetail: PropTypes.func
}

export default GroupListItem