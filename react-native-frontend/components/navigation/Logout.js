import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'react-native-paper'

import { logoutUser } from '../../store/reducers/user'

const Logout = props => {
	return (
		<Button mode="text" onPress={props.logoutUser()}>
            Logout
		</Button>
	)
}

Logout.propTypes = {
	userdata: PropTypes.object,
	logoutUser: PropTypes.func
}

const mapStateToProps = state => {
	return {
		userdata: state.user.userdata
	}
}

const connectedLogout = connect(mapStateToProps, {
	logoutUser
})(Logout)

export default connectedLogout