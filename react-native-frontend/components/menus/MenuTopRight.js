import React, { useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Menu, Divider, Provider } from 'react-native-paper'
import { useNavigation  } from '@react-navigation/native'

import { logoutUser } from '../../store/reducers/user'

import Ellipsis from '../icons/Ellipsis'
import Colors from '../../constants/Colors'

const MenuTopRight = props => {

	const navigation = useNavigation()

	const [visible, setVisible] = useState(false)

	const openMenu = () => setVisible(true)

	const closeMenu = () => setVisible(false)

	return (
		<Provider>
			<View>
				<Menu
					visible={visible}
					onDismiss={closeMenu}
					style={styles.menu}
					anchor={
						<TouchableOpacity onPress={openMenu} style={styles.toggleButton}>
							<Ellipsis size={20} color={Colors.white} />
						</TouchableOpacity>
					}>
					<Menu.Item onPress={() => navigation.navigate('GroupList')} title="My groups" style={styles.menuItem} />
					<Menu.Item onPress={() => {}} title="My account" style={styles.menuItem} />
					<Divider />
					<Menu.Item onPress={() => props.logoutUser()} title="Logout" style={styles.menuItem} />
				</Menu>
			</View>
		</Provider>
	)
}

const styles = StyleSheet.create({
	toggleButton: {
		marginTop: 20,
	},
	menu: {
		marginTop: 10,
		marginLeft: -400,
		maxWidth: 340,
	},
	menuItem: {
		position: 'relative',
		zIndex: 100,
	}
})

MenuTopRight.propTypes = {
	userdata: PropTypes.object,
	logoutUser: PropTypes.func,
	navigation: PropTypes.object
}

const mapStateToProps = state => {
	return {
		userdata: state.user.userdata
	}
}

const connectedMenuTopRight = connect(mapStateToProps, {
	logoutUser
})(MenuTopRight)

export default connectedMenuTopRight