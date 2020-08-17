import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Linking from 'expo-linking'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'

import { authenticationCheck } from '../../store/actions/user'
import { getInvitationByGroup } from '../../store/actions/invitations'

import WelcomeNavigation from '../../navigation/WelcomeNavigation'
import GroupNavigation from '../../navigation/GroupNavigation'
import Colors from '../../constants/Colors'

const AppNavigation = ({
	authenticationCheck,
	getInvitationByGroup,
	loading,
	userdata,
	loginFail,
	registerFail,
	openAccessInvitation
}) => {

	useEffect(() => {
		authenticationCheck()

		const getUrlAsync = async () => {
			const initialUrlObj = await Linking.parseInitialURLAsync()
			if (initialUrlObj.queryParams.id) {
				console.log('urll', initialUrlObj)
				await getInvitationByGroup(initialUrlObj.queryParams.id)
			}
		}
		
		getUrlAsync()	
		
	}, [])

	console.log('openaccessinv----------', openAccessInvitation)

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
	userdata: PropTypes.object,
	loading: PropTypes.bool,
	error: PropTypes.string,
	loginFail: PropTypes.bool,
	registerFail: PropTypes.bool,
	openAccessInvitation: PropTypes.object
}

const mapStateToProps = state => {
	return {
		userdata: state.user.userdata,
		loading: state.user.fetching,
		error: state.user.error,
		loginFail: state.user.loginFail,
		registerFail: state.user.registerFail,
		openAccessInvitation: state.invitations.openAccessInvitation
	}
}

const connectedAppNavigation = connect(
	mapStateToProps, 
	{
		authenticationCheck,
		getInvitationByGroup
	}
)(AppNavigation)

export default connectedAppNavigation