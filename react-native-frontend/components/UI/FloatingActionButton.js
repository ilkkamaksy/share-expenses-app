import * as React from 'react'
import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import Colors from '../../constants/Colors'

const FloatingActionButton = () => (
	<FAB
		style={styles.fab}
		small
		icon="plus"
		onPress={() => console.log('Pressed')}
	/>
)

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: Colors.primary
	},
})

export default FloatingActionButton