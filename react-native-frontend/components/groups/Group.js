import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

const Group = ({ title, id, ownerId }) => {
	return (
		<View style={styles.group}>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text>{id}</Text>
				<Text>{ownerId}</Text>
			</View>
		</View>
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
})

export default Group