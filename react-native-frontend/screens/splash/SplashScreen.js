import React from 'react'
import PropTypes from 'prop-types'
import Home from '../../components/pages/Home'

const SplashScreen = ({navigation}) => {
	return (
		<Home navigation={navigation} />
	)
}

SplashScreen.propTypes = {
	navigation: PropTypes.object
}

export default SplashScreen