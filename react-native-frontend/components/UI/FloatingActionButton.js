import * as React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import Colors from '../../constants/Colors'

const FloatingActionButton = ({ labelText, onPress, ...props }) => {

	return (
		<FAB
			style={styles.fab}
			color={Colors.white}
			small={false}
			icon="plus"
			onPress={() => onPress()}
			label={labelText ? labelText : ''}
			accessibilityLabel={labelText ? labelText : 'FAB'}
			{...props}
		/>
	)
} 

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 10,
		backgroundColor: Colors.primary,
	},
})

FloatingActionButton.propTypes = {
	onPress: PropTypes.func,
	labelText: PropTypes.string
}

export default FloatingActionButton