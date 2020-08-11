import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'

import { authenticationCheck } from '../../store/actions/user'
import WelcomeNavigation from '../../navigation/WelcomeNavigation'
import GroupNavigation from '../../navigation/GroupNavigation'
import Colors from '../../constants/Colors'

const AppNavigation = ({
	authenticationCheck,
	loading,
	userdata,
	loginFail,
	registerFail,
}) => {

	useEffect(() => {
		authenticationCheck()
	}, [])

	if (loading) {
		return (
			<ActivityIndicator animating={true} color={Colors.primary} />
		)
	}

	return (
		
		<NavigationContainer>
			{userdata === null ? (
				<WelcomeNavigation activeScreen={loginFail ? 'Login' : registerFail ? 'Register' : 'Splash'} />
			) : (
				<GroupNavigation />
			) 
			} 
		</NavigationContainer>        
    
	)
}

AppNavigation.propTypes = {
	userdata: PropTypes.object,
	loading: PropTypes.bool,
	authenticationCheck: PropTypes.func,
	error: PropTypes.string,
	loginFail: PropTypes.bool,
	registerFail: PropTypes.bool
}

const mapStateToProps = state => {
	return {
		userdata: state.user.userdata,
		loading: state.user.fetching,
		error: state.user.error,
		loginFail: state.user.loginFail,
		registerFail: state.user.registerFail
	}
}

const connectedAppNavigation = connect(
	mapStateToProps, 
	{
		authenticationCheck
	}
)(AppNavigation)

export default connectedAppNavigation