import React from 'react'
import PropTypes from 'prop-types'

import Background from '../../components/common/Background'
import Header from '../../components/common/Header'
import Logo from '../../components/common/Logo'
import BackButton from '../../components/UI/BackButton'
import RegisterForm from '../../components/forms/RegisterForm'

const RegisterScreen = ({ navigation }) => {

	return (
		<Background>

			<BackButton goBack={() => navigation.navigate('Splash')} />

			<Logo />

			<Header>Sign up</Header>

			<RegisterForm navigation={navigation} />

		</Background>
		
	)
}


RegisterScreen.propTypes = {
	navigation: PropTypes.object
}

export default RegisterScreen