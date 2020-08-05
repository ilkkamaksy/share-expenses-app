import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { setGroupTitle, setGroupLocation, saveGroup, updateGroup } from '../../store/reducers/groups'

import Heading from '../UI/Heading'
import TextInput from '../UI/TextInput'
import Colors from '../../constants/Colors'

const EditGroupInfo = ({ 
	error, 
	groupToEdit, 
	setGroupTitle, 
	setGroupLocation, 
	saveGroup, 
	updateGroup,
	navigation 
}) => {

	const [existingGroupToEdit, setExistingGroupToEdit] = useState({})

	useEffect(() => {
		setExistingGroupToEdit(groupToEdit)
	}, [])

	const onSaveGroup = async () => {
		if (!groupToEdit.id) {
			await saveGroup(groupToEdit)
			navigation.navigate('EditGroupPeople')
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
	}
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
	setGroupToEdit: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
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
		updateGroup
	}
)(EditGroupInfo)

export default connectedEditGroupInfo