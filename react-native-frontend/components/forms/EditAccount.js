import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Button, ActivityIndicator } from 'react-native-paper'

import { 
	setEmail, 
	setName, 
	updateUser, 
	removeUser,
} from '../../store/actions/user'

import Heading from '../UI/Heading'
import Paragraph from '../UI/Paragraph'
import TextInput from '../UI/TextInput'
import Modal from '../UI/Modal'
import Colors from '../../constants/Colors'

const EditAccount = ({ 
	email,
	name,
	userdata,
	error, 
	fetching,
	setEmail,
	setName,
	removeUser,
	updateUser,
}) => {


	const [modalVisible, setModalVisible] = useState(false)

	const onConfirmRemoveUser = async () => {
		await removeUser(userdata.id)
	}

	const toggleRemoveConfirmationModal = () => {
		setModalVisible(!modalVisible)
	}

	const onUpdateUser = async () => {
		await updateUser({
			id: userdata.id,
			name,
			email
		})
	}


	return (
		<ScrollView>

			{error.length > 0 && 
			<Paragraph style={[{ color: Colors.error }]}>
				{error}
			</Paragraph>
			}
			
			
			<Modal visible={modalVisible}>
				<Heading style={[styles.modalText, { fontSize: 18 }]}>Permanently remove user account?</Heading>

				<Paragraph style={[{ textAlign: 'center', fontSize: 13, marginTop: 10, color: Colors.lightCoffee, lineHeight: 20 }]}>
							All your data will be permanently lost.
				</Paragraph>

				<View style={[styles.row, { marginTop: 20 }]}>

					<Button 
						mode="outlined" 
						onPress={() => setModalVisible(!modalVisible)}
						color={Colors.primary}
						labelStyle={{ color: Colors.primary, fontSize: 12 }}
						style={{ marginRight: 10 }}
					>
							Cancel
					</Button>

					<Button 
						mode="contained" 
						disabled={true}
						onPress={onConfirmRemoveUser}
						color={Colors.primary}
						labelStyle={{ color: Colors.white, fontSize: 12 }}
						style={{ marginLeft: 10 }}
					>
							Confirm
					</Button>
						
						
				</View>
					
				
			</Modal>

			<Heading style={[{ 
				textAlign: 'left', 
				fontSize: 12, 
				color: Colors.primary, 
				textTransform: 'uppercase', 
				paddingBottom: 5 
			}]}>
				Account details
			</Heading>

			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Name"
						label="Name" 
						value={name ? name : ''}
						onChangeText={text => setName(text)}
						error={false}
						errorText=""
						returnKeyType="next"
						mode="outlined"
					/>
				</View>

				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Email"
						label="Email" 
						value={email ? email : ''}
						onChangeText={text => setEmail(text)}
						error={false}
						errorText=""
						returnKeyType="next"
						mode="outlined"
					/>
				</View>

				<View style={[styles.formControl, { position: 'relative' }]}>
					
					{fetching && <ActivityIndicator animating={true} color={Colors.primary} style={{ position: 'absolute', top: 20, width: '100%' }} />}
					
					<Button 
						disabled={true} 
						mode="contained" 
						onPress={onUpdateUser}
						color={Colors.primary}
						labelStyle={{ color: Colors.white }}
						style={styles.button}
					>	
						Save changes
					</Button>
				</View>

				
				<View style={[styles.formControl, { marginVertical: 80 }]}>
					<Heading style={[{ 
						textAlign: 'left', 
						fontSize: 12, 
						color: Colors.primary, 
						textTransform: 'uppercase', 
						paddingBottom: 5 
					}]}>
							Delete Account
					</Heading>
					<Paragraph style={[{ textAlign: 'left', fontSize: 13, marginBottom: 15, color: Colors.lightCoffee, lineHeight: 20 }]}>
							When you remove your account, all data will be permanently lost.
					</Paragraph>    

					<Button 
						mode="outlined" 
						onPress={toggleRemoveConfirmationModal}
						color={Colors.primary}
						labelStyle={{ color: Colors.primary }}
						style={styles.removeButton}
					>
						Delete account
					</Button>
				</View>
				
                
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
	}, 
	rowItem: {
		flex: 1
	},
	button: {
		marginTop: 10
	},
	removeButton: {
		
	},
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

EditAccount.propTypes = {
	name: PropTypes.string,
	email: PropTypes.string,
	password: PropTypes.string,
	userdata: PropTypes.object,
	fetching: PropTypes.bool,
	initialFetchDone: PropTypes.bool,
	error: PropTypes.string,
	updateUser: PropTypes.func,
	removeUser: PropTypes.func,
	setEmail: PropTypes.func,
	setPassword: PropTypes.func,
	setName: PropTypes.func,
}

const mapStateToProps = (state) => {
	return {
		userdata: state.user.userdata.user,
		fetching: state.user.fetching,
		error: state.user.error,
		name: state.user.name,
		email: state.user.email,
	}
}

const connectedEditAccount = connect(
	mapStateToProps,
	{
		setEmail,
		setName,
		updateUser,
		removeUser
	}
)(EditAccount)

export default connectedEditAccount