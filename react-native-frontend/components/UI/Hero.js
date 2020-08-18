import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const Hero = ({ children, style}) => (
	<View
		style={[
			styles.container,
			style
		]}
	>

		<View style={styles.content} behavior="padding">
			{children}
		</View>
	</View>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.primary,
		paddingLeft: 10,
		paddingRight: 10,
		zIndex: -1
	},
	content: {
		flex: 1,
		paddingVertical: 30,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
		zIndex: -1
	},
})


Hero.propTypes = {
	children: PropTypes.array,
	style: PropTypes.array,
	navigation: PropTypes.object
}

export default Hero