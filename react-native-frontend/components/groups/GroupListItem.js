import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'

const GroupListItem = ({ item, onViewDetail, removeGroup }) => {
	return (
		<TouchableOpacity onPress={onViewDetail} style={styles.groupContainer}>
			<View style={styles.group}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>{item.title}</Text>
					<Text>{`Group id ${item.id}`}</Text>
					<Text>{`Group owner id ${item.owner.id}`}</Text>
				</View>
				<View style={styles.actions}>
					<Button color={Colors.primary} title="view" onPress={onViewDetail} />
					<Button color={Colors.accent} title="remove" onPress={() => removeGroup(item.id)} />
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	groupContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	group: {
		borderRadius: 4,
		backgroundColor: 'white',
		margin: 10,
		width: '80%'
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
	item: PropTypes.object,
	onViewDetail: PropTypes.func,
	removeGroup: PropTypes.func
}

export default GroupListItem