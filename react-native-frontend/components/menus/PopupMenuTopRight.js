import * as React from 'react'
import { List } from 'react-native-paper'
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigation  } from '@react-navigation/native'

import { toggleTopRightMenu } from '../../store/actions/nav'
import { logoutUser } from '../../store/actions/user'

const PopupMenuTopRight = ({ topRightMenuVisible, toggleTopRightMenu, logoutUser }) => {

	if (!topRightMenuVisible) {
		return <></>
	}

	const navigation = useNavigation()

	const onNavigate = (destination) => {
		toggleTopRightMenu(false)
		navigation.navigate(destination)
	}

	return (
		<Modal 
			animationType="slideRight"
			transparent={true}
			visible={topRightMenuVisible}
		>
			<TouchableOpacity
				style={styles.modalToggle}
				onPress={() => toggleTopRightMenu(!topRightMenuVisible)}>

				<View style={styles.modalView}>
			
					<List.Item
						title="My Account"
						onPress={() => onNavigate('EditAccount')}	
					/>

					<List.Item
						title="Logout"
						onPress={logoutUser}	
					/>
				</View>
						
			</TouchableOpacity>

		</Modal>
	)
} 

const styles = StyleSheet.create({
	modalView: {
		width: 200,
		elevation: 10,
		marginTop: 20,
		marginRight: 10,
		backgroundColor: '#fff',
		borderRadius: 4,
		zIndex: 9
	},
	modalToggle: {
		backgroundColor: 'transparent', 
		flex: 1,
		justifyContent: 'flex-end',
		flexDirection: 'row',
		flexWrap: 'wrap' 
	},
	wrapper: {
		backgroundColor: 'transparent',
		flex: 1,
		height: '100%',
		width: '100%',
		position: 'absolute',
		bottom: 0,
		zIndex: 0
	}
})

PopupMenuTopRight.propTypes = {
	topRightMenuVisible: PropTypes.bool,
	toggleTopRightMenu: PropTypes.func,
	logoutUser: PropTypes.func
}

const mapStateToProps = state => {
	return {
		topRightMenuVisible: state.navigation.topRightMenuVisible
	}
}

const ConnectedPopupMenuTopRight = connect(mapStateToProps, {
	toggleTopRightMenu,
	logoutUser
})(PopupMenuTopRight)

export default ConnectedPopupMenuTopRight