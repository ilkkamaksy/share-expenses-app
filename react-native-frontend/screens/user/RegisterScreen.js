import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import Background from '../../components/UI/Background'
import Heading from '../../components/UI/Heading'
import Logo from '../../components/UI/Logo'
import BackButton from '../../components/UI/BackButton'
import RegisterForm from '../../components/forms/RegisterForm'
import Colors from '../../constants/Colors'

const RegisterScreen = ({ navigation }) => {

	return (
		<Background>

			<BackButton 
				color={Colors.primary} 
				goBack={() => navigation.navigate('Splash')} 
				distanceTop={20}
			/>

			<Logo />

			<View style={styles.container}>
				<Heading style={[{ color: Colors.primary }]}>Sign up</Heading>

				<RegisterForm navigation={navigation} />

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


RegisterScreen.propTypes = {
	navigation: PropTypes.object
}

export default RegisterScreen