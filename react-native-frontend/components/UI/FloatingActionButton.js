import * as React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import Colors from '../../constants/Colors'

const FloatingActionButton = props => {

	return (
		<FAB
			style={styles.fab}
			color={Colors.white}
			small
			icon="plus"
			onPress={() => props.onPress()}
			accessibilityLabel={props.labelText ? props.labelText : 'FAB'}
		/>
	)
} 

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 10,
		backgroundColor: Colors.primary
	},
})

FloatingActionButton.propTypes = {
	onPress: PropTypes.func,
	labelText: PropTypes.string
}

export default FloatingActionButton