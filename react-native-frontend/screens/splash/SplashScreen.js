import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import Background from '../../components/UI/Background'
import Home from '../../components/pages/Home'
import Logo from '../../components/UI/Logo'

import Colors from '../../constants/Colors'

const SplashScreen = ({navigation}) => {
	return (
		<Background>
			<Logo />
			<View style={styles.container}>
				<Home navigation={navigation} />
			</View>
		</Background>
		
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 5.46,

		elevation: 9,
	}
})

SplashScreen.propTypes = {
	navigation: PropTypes.object
}

export default SplashScreen