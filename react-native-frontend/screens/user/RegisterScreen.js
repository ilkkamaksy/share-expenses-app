import React from 'react'
import PropTypes from 'prop-types'

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
				color={Colors.coffee} 
				goBack={() => navigation.navigate('Splash')} 
				distanceTop={20}
			/>

			<Logo />

			<Heading>Sign up</Heading>

			<RegisterForm navigation={navigation} />

		</Background>
		
	)
}


RegisterScreen.propTypes = {
	navigation: PropTypes.object
}

export default RegisterScreen