import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
} from 'react-native'

import BackButton from './BackButton'
import Colors from '../../constants/Colors'

import MenuTopRight from '../menus/MenuTopRight'

const Hero = ({ children, style, navigation }) => (
	<View
		style={[
			styles.background,
			style
		]}
	>
		<BackButton color={Colors.white} goBack={() => navigation.navigate('Splash')} />
		
		<MenuTopRight />

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
		paddingTop: 80,
		paddingBottom: 40,
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