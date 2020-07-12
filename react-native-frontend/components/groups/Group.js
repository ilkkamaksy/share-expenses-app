import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

import FloatingActionButton from '../UI/FloatingActionButton'

const Group = ({ title, id, ownerId }) => {
	return (
		<View style={styles.container}>
			<View style={styles.group}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text>{id}</Text>
					<Text>{ownerId}</Text>
				</View>
			</View>
			<FloatingActionButton onPress={() => console.log('pressed')} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	group: {
		borderRadius: 4,
		backgroundColor: 'white',
		margin: 10,
	},
	textContainer: {
		margin: 10,
		textAlign: 'center'
	},
	title: {
		fontSize: 18,
		marginBottom: 8
	},
})

Group.propTypes = {
	title: PropTypes.string,
	id: PropTypes.string,
	ownerId: PropTypes.string,
	onViewDetail: PropTypes.func
}

export default Group