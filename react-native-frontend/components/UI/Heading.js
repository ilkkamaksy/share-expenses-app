import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import Colors from '../../constants/Colors'

const Heading = ({ children, style }) => (
	<Text style={[
		styles.header,
		style
	]}
	>
		{children}
	</Text>
)

const styles = StyleSheet.create({
	header: {
		textAlign: 'center',
		fontSize: 26,
		color: Colors.coffee,
		fontWeight: 'bold',
		paddingVertical: 14,
	},
})

Heading.propTypes = {
	children: PropTypes.string,
	style: PropTypes.array
}

export default Heading