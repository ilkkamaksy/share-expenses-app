import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'

import { setGroupTitle, setGroupLocation, saveGroup, updateGroup } from '../../store/reducers/groups'

const EditGroupInfo = props => {

	const { 
		error, 
		groupToEdit, 
		setGroupTitle, 
		setGroupLocation, 
		saveGroup, 
		updateGroup,
		navigation } = props

	const onSaveGroup = async () => {
		if (!groupToEdit.id) {
			await saveGroup(groupToEdit)
		} else {
			await updateGroup(groupToEdit)
		}
		
		navigation.navigate('EditGroupPeople')
	}

	return (
		<ScrollView>

			<View>
				<Text>{error}</Text>
			</View>
			
			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Title"
						label="Title" 
						style={styles.input} 
						value={groupToEdit.title}
						onChangeText={text => setGroupTitle(text)}
					/>
				</View>
				
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Location"
						label="Location (optional)" 
						style={styles.input} 
						value={groupToEdit.location}
						onChangeText={text => setGroupLocation(text)}
					/>
				</View>
			
				<View style={styles.formControl}>
					<Button 
						disabled={groupToEdit.title.length > 0 ? false : true} 
						mode="contained" 
						onPress={onSaveGroup}
					>
						{!groupToEdit.id ? 'Save & start adding people' : 'Ok, let\'s edit group members'}
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