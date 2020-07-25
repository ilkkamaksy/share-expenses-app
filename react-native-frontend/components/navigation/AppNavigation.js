import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'

import { authenticationCheck } from '../../store/reducers/user'
import WelcomeNavigator from '../../navigation/WelcomeNavigation'
import GroupNavigator from '../../navigation/GroupNavigation'
import Colors from '../../constants/Colors'

const AppNavigation = props => {

	useEffect(() => {
		props.authenticationCheck()
	}, [])

	if (props.loading) {
		return (
			<ActivityIndicator animating={true} color={Colors.primary} />
		)
	}

	return (
		
		<NavigationContainer>
			{props.userdata === null ? (
				<WelcomeNavigator activeScreen={props.loginFail ? 'Login' : props.registerFail ? 'Register' : 'Splash'} />
			) : (
				<GroupNavigator />
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