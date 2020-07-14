import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import FloatingActionButton from '../UI/FloatingActionButton'

const Group = ({ group, navigation }) => {

	const onEditGroup = () => {
		navigation.navigate('EditGroupInfo', { id: group.id } )
	}

	return (
		<View style={styles.container}>
			<View style={styles.group}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>{group.title}</Text>
					<Text>{group.location}</Text>
				</View>
			</View>
			<Button 
				mode="contained" 
				onPress={onEditGroup}
			>
				Edit group
			</Button>
			
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
	group: PropTypes.object,
	onViewDetail: PropTypes.func,
	navigation: PropTypes.object
}

export default Group