import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import Colors from '../../constants/Colors'

const Paragraph = ({ children, style }) => (
	<Text style={[
		styles.text,
		style
	]}>
		{children}
	</Text>
)

Paragraph.propTypes = {
	children: PropTypes.string,
	style: PropTypes.array
}

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		lineHeight: 26,
		color: Colors.coffee,
		textAlign: 'center',
		marginBottom: 14,
	},
})

export default Paragraph