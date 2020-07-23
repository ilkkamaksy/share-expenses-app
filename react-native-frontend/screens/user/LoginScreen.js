import React from 'react'
import PropTypes from 'prop-types'

import LoginForm from '../../components/forms/LoginForm'
import Background from '../../components/common/Background'
import Header from '../../components/common/Header'
import Logo from '../../components/common/Logo'
import BackButton from '../../components/UI/BackButton'

const LoginScreen = ({ navigation }) => {
	return (
		<Background>

			<BackButton goBack={() => navigation.navigate('Splash')} />

			<Logo />

			<Header>Welcome back</Header>

			<LoginForm navigation={navigation} />

		</Background>
		
	) 
}

LoginScreen.propTypes = {
	navigation: PropTypes.object
}

export default LoginScreen