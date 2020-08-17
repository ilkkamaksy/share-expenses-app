import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, TouchableOpacity } from 'react-native'

import Ellipsis from '../icons/Ellipsis'
import Colors from '../../constants/Colors'

import { toggleTopRightMenu } from '../../store/actions/nav'

const ToggleMenu = ({ toggleTopRightMenu }) => {

	return (
		<TouchableOpacity onPress={() => toggleTopRightMenu(true)} style={styles.toggleButton}>
			<Ellipsis size={20} color={Colors.white} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	toggleButton: {
	
	},
})

ToggleMenu.propTypes = {
	topRightMenuVisible: PropTypes.bool,
	toggleTopRightMenu: PropTypes.func
}

const connectedToggleMenu = connect(null, {
	toggleTopRightMenu
})(ToggleMenu)

export default connectedToggleMenu