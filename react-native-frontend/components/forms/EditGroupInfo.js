import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { Button, ActivityIndicator } from 'react-native-paper'

import { 
	setGroupTitle, 
	setGroupLocation, 
	createGroup, 
	updateGroup,
	removeGroup 
} from '../../store/actions/groups'

import Heading from '../UI/Heading'
import Paragraph from '../UI/Paragraph'
import TextInput from '../UI/TextInput'
import Modal from '../UI/Modal'
import Colors from '../../constants/Colors'

const EditGroupInfo = ({ 
	user,
	error, 
	fetching,
	groupToEdit, 
	setGroupTitle, 
	setGroupLocation, 
	createGroup, 
	updateGroup,
	removeGroup,
	navigation 
}) => {

	const [existingGroupToEdit, setExistingGroupToEdit] = useState({})
	const [modalVisible, setModalVisible] = useState(false)

	useEffect(() => {
		setExistingGroupToEdit(groupToEdit)
	}, [])

	const onConfirmRemoveGroup = async () => {
		navigation.navigate('GroupList')
		await removeGroup(groupToEdit.id)
	}

	const toggleRemoveConfirmationModal = () => {
		setModalVisible(!modalVisible)
	}

	const onSaveGroup = async () => {
		if (!groupToEdit.id) {
			await createGroup(groupToEdit)
			navigation.navigate('AddGroupPeople')
		} else {
			await updateGroup(groupToEdit)
		}
	}

	const validateForm = () => {
		if (groupToEdit.title.length === 0) {
			return true
		}

		if (
			groupToEdit.id && 
			groupToEdit.title === existingGroupToEdit.title && 
			groupToEdit.location === existingGroupToEdit.location
		) {
			return true
		}

		return false
	}

	return (
		<ScrollView>

			{error.length > 0 && 
			<Paragraph style={[{ color: Colors.error }]}>
				{error}
			</Paragraph>
			}
			
			
			{groupToEdit.id && groupToEdit.owner.id === user.id &&
				<Modal visible={modalVisible}>
					<Heading style={styles.modalText}>{`Permanently remove group "${groupToEdit.title}"?`}</Heading>

					<TouchableHighlight
						style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
						onPress={() => {
							onConfirmRemoveGroup()
						}}
					>
						<Text style={styles.textStyle}>Confirm</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
						onPress={() => {
							setModalVisible(!modalVisible)
						}}
					>
						<Text style={styles.textStyle}>Cancel</Text>
					</TouchableHighlight>
				
				</Modal>
			}
			

			<Heading style={[{ textAlign: 'left', fontSize: 12, color: Colors.secondary, textTransform: 'uppercase', paddingBottom: 5 }]}>
				Edit Group details
			</Heading>

			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Title"
						label="Title" 
						value={groupToEdit.title}
						onChangeText={text => setGroupTitle(text)}
						error={false}
						errorText=""
						returnKeyType="next"
						mode="outlined"
					/>
				</View>
				
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Location"
						label="Location (optional)" 
						value={groupToEdit.location}
						onChangeText={text => setGroupLocation(text)}
						error={false}
						errorText=""
						returnKeyType="next"
						mode="outlined"
					/>
				</View>
			
				<View style={[styles.formControl, { position: 'relative' }]}>
					
					{fetching && <ActivityIndicator animating={true} color={Colors.primary} style={{ position: 'absolute', top: 20, width: '100%' }} />}
					
					<Button 
						disabled={validateForm() || fetching} 
						mode="contained" 
						onPress={onSaveGroup}
						color={Colors.primary}
						labelStyle={{ color: Colors.white }}
						style={styles.button}
					>	
						{!groupToEdit.id ? 'Save & start adding people' : 'Save changes'}
					</Button>
				</View>

				{groupToEdit.id && groupToEdit.owner.id === user.id &&
					<View style={[styles.formControl, { marginVertical: 80 }]}>
						<Heading style={[{ 
							textAlign: 'left', 
							fontSize: 12, 
							color: Colors.secondary, 
							textTransform: 'uppercase', 
							paddingBottom: 5 
						}]}>
							Remove group
						</Heading>
						<Paragraph style={[{ textAlign: 'left', fontSize: 13, marginBottom: 15, color: Colors.lightCoffee, lineHeight: 20 }]}>
							When you remove this group, all expenses and group data will be permanently lost from all users.
						</Paragraph>    

						<Button 
							mode="outlined" 
							onPress={toggleRemoveConfirmationModal}
							color={Colors.primary}
							labelStyle={{ color: Colors.primary }}
							style={styles.removeButton}
						>
							Remove group
						</Button>
					</View>
				}
                
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
		justifyContent: 'space-between'
	}, 
	rowItem: {
		flex: 0
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

EditGroupInfo.propTypes = {
	navigation: PropTypes.object,
	user: PropTypes.object,
	fetching: PropTypes.bool,
	error: PropTypes.string,
	groupToEdit: PropTypes.object,
	setGroupTitle: PropTypes.func,
	setGroupLocation: PropTypes.func,
	createGroup: PropTypes.func,
	updateGroup: PropTypes.func,
	setGroupToEdit: PropTypes.func,
	removeGroup: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		user: state.user.userdata.user,
		fetching: state.groups.fetching,
		error: state.groups.error,
		groupToEdit: state.groups.groupToEdit
	}
}

const connectedEditGroupInfo = connect(
	mapStateToProps,
	{
		setGroupTitle,
		setGroupLocation,
		createGroup,
		updateGroup,
		removeGroup
	}
)(EditGroupInfo)

export default connectedEditGroupInfo