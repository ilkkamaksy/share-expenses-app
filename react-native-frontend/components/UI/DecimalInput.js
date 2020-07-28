import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import Colors from '../../constants/Colors'

const DecimalInput = ({ errorText, ...props }) => (
	<View style={styles.container}>
		<Input
			style={styles.input}
			selectionColor={Colors.primary}
			underlineColor="transparent"
			dense={true}
			mode="flat"
			{...props}
		/>
		{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
	</View>
)

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 12,
	},
	input: {
		backgroundColor: Colors.white,
	},
	error: {
		fontSize: 14,
		color: Colors.error,
		paddingHorizontal: 4,
		paddingTop: 4,
	},
})


DecimalInput.propTypes = {
	errorText: PropTypes.string
}

export default DecimalInput