import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Linking from 'expo-linking'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'

import { authenticationCheck } from '../../store/actions/user'
import { setReferrerUrl } from '../../store/actions/invitations'

import WelcomeNavigation from '../../navigation/WelcomeNavigation'
import GroupNavigation from '../../navigation/GroupNavigation'
import Colors from '../../constants/Colors'

const AppNavigation = ({
	authenticationCheck,
	setReferrerUrl,
	loading,
	userdata,
	loginFail,
	registerFail
}) => {

	useEffect(() => {

		authenticationCheck()

		const getReferrerUrlAsync = async () => {
			const initialUrlObj = await Linking.parseInitialURLAsync()
			setReferrerUrl(initialUrlObj)
		}
			
		getReferrerUrlAsync()		
		

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
	authenticationCheck: PropTypes.func,
	getInvitationByGroup: PropTypes.func,
	setReferrerUrl: PropTypes.func,
	userdata: PropTypes.object,
	loading: PropTypes.bool,
	error: PropTypes.string,
	loginFail: PropTypes.bool,
	registerFail: PropTypes.bool,
	referrerUrl: PropTypes.object,
}

const mapStateToProps = state => {
	return {
		userdata: state.user.userdata,
		loading: state.user.fetching,
		error: state.user.error,
		loginFail: state.user.loginFail,
		registerFail: state.user.registerFail,
	}
}

const connectedAppNavigation = connect(
	mapStateToProps, 
	{
		authenticationCheck,
		setReferrerUrl
	}
)(AppNavigation)

export default connectedAppNavigation