import React from 'react'
import PropTypes from 'prop-types'
import {
	ImageBackground,
	StyleSheet,
	KeyboardAvoidingView,
} from 'react-native'

const Background = ({ children }) => (
	<ImageBackground
		// eslint-disable-next-line no-undef
		source={require('../../assets/cool-background.png')}
		resizeMode="cover"
		style={styles.background}
	>
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			{children}
		</KeyboardAvoidingView>
	</ImageBackground>
)

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
	},
	container: {
		flex: 1,
		padding: 20,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
})


Background.propTypes = {
	children: PropTypes.array
}

export default Background