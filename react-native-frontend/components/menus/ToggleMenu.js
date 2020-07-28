import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, TouchableOpacity } from 'react-native'

import Ellipsis from '../icons/Ellipsis'
import Colors from '../../constants/Colors'

import { toggleTopRightMenu } from '../../store/reducers/groups'

const ToggleMenu = ({ toggleTopRightMenu, topRightMenuVisible }) => {

	return (
		<TouchableOpacity onPress={() => toggleTopRightMenu(!topRightMenuVisible)} style={styles.toggleButton}>
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

const mapStateToProps = state => {
	return {
		topRightMenuVisible: state.groups.topRightMenuVisible
	}
}

const connectedToggleMenu = connect(mapStateToProps, {
	toggleTopRightMenu
})(ToggleMenu)

export default connectedToggleMenu