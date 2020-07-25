import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
} from 'react-native'

import Colors from '../../constants/Colors'

const Hero = ({ children, style}) => (
	<View
		style={[
			styles.background,
			style
		]}
	>
		
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			{children}
		</KeyboardAvoidingView>
	</View>
)

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.primary,
		paddingLeft: 10,
		paddingRight: 10
	},
	container: {
		flex: 1,
		paddingTop: 40,
		paddingBottom: 60,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
	},
})


Hero.propTypes = {
	children: PropTypes.array,
	style: PropTypes.array,
	navigation: PropTypes.object
}

export default Hero