import React from 'react'
import PropTypes from 'prop-types'
import { Modal as NativeModal, View, StyleSheet } from 'react-native'

const Modal = ({ children, visible }) => {

	return (
			
		<NativeModal
			animationType="slide"
			transparent={true}
			visible={visible}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					{children}
				</View>
			</View>
		</NativeModal>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
})

Modal.propTypes = {
	children: PropTypes.array,
	visible: PropTypes.bool
}

export default Modal