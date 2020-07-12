import * as React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import Colors from '../../constants/Colors'

const FloatingActionButton = props => (
	<FAB
		style={styles.fab}
		small
		icon="plus"
		onPress={() => props.onPress()}
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

FloatingActionButton.propTypes = {
	onPress: PropTypes.func
}

export default FloatingActionButton