import React from 'react'
import PropTypes from 'prop-types'

import LoginForm from '../../components/forms/LoginForm'
import Background from '../../components/UI/Background'
import Heading from '../../components/UI/Heading'
import Logo from '../../components/UI/Logo'
import BackButton from '../../components/UI/BackButton'
import Colors from '../../constants/Colors'

const LoginScreen = ({ navigation }) => {
	return (
		<Background>

			<BackButton 
				color={Colors.coffee} 
				goBack={() => navigation.navigate('Splash')} 
				distanceTop={20}
			/>

			<Logo />

			<Heading>Welcome back</Heading>

			<LoginForm navigation={navigation} />

		</Background>
		
	) 
}

LoginScreen.propTypes = {
	navigation: PropTypes.object
}

export default LoginScreen