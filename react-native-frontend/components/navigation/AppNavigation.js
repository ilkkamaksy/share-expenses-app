import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'

import { authenticationCheck } from '../../store/reducers/user'
import WelcomeNavigator from '../../navigation/WelcomeNavigation'
import AppNavigator from '../../navigation/GroupNavigation'
import Colors from '../../constants/Colors'

const AppNavigation = props => {

	// const loggedInUserJSON = await AsyncStorage.getItem('loggedAppUser')
	// await AsyncStorage.setItem('loggedAppUser', JSON.stringify(response.data.data.register))
	// await AsyncStorage.setItem('loggedAppUser', JSON.stringify(response.data.data.login))
	// await window.localStorage.removeItem('loggedAppUser')

	useEffect(() => {
		props.authenticationCheck()
	}, [])

	console.log(props)
    
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
				<AppNavigator />
			) 
			} 
		</NavigationContainer>        
    
	)
}

AppNavigation.propTypes = {
	userdata: PropTypes.object,
	loading: PropTypes.bool,
	authenticationCheck: PropTypes.func,
	error: PropTypes.object,
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