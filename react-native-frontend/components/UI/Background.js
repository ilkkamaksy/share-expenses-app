import React from 'react'
import PropTypes from 'prop-types'
import {
	ImageBackground,
	StyleSheet,
	View,
} from 'react-native'

const Background = ({ children }) => (
	<ImageBackground
		// eslint-disable-next-line no-undef
		source={require('../../assets/pattern.png')}
		resizeMode="repeat"
		style={styles.background}
	>
		<View style={styles.container} behavior="padding">
			{children}
		</View>
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