import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-paper'

import { 
	setGroupTitle, 
	setGroupLocation, 
	saveGroup, 
	updateGroup,
	removeGroup 
} from '../../store/actions/groups'

import Heading from '../UI/Heading'
import TextInput from '../UI/TextInput'
import Modal from '../UI/Modal'
import Colors from '../../constants/Colors'

const EditGroupInfo = ({ 
	user,
	error, 
	groupToEdit, 
	setGroupTitle, 
	setGroupLocation, 
	saveGroup, 
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
			await saveGroup(groupToEdit)
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

			<View>
				<Text>{error}</Text>
			</View>
			
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
			
				<View style={styles.formControl}>
					<Button 
						disabled={validateForm()} 
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
					<View style={styles.formControl}>
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
		marginTop: 80
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
	saveGroup: PropTypes.func,
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
		saveGroup,
		updateGroup,
		removeGroup
	}
)(EditGroupInfo)

export default connectedEditGroupInfo