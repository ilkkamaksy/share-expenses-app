import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import Colors from '../../constants/Colors'

const Header = ({ children }) => (
	<Text style={styles.header}>{children}</Text>
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

Header.propTypes = {
	children: PropTypes.string
}

export default Header