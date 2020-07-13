import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'

import { saveGroup, setCurrentPerson, addPersonToGroup, removePerson } from '../../store/reducers/groups'
import contactsService from '../../services/contactsService'

const EditGroupPeople = props => {

	const { 
		error, 
		groupToEdit, 
		currentPerson, 
		setCurrentPerson, 
		addPersonToGroup, 
		removePerson,
		saveGroup, 
		navigation } = props

	const [contactList, setContactList] = useState({})

	useEffect(() => {
		(async () => {
			const data = await contactsService.getContactsFromDevice()
			if (data.length > 0) {
				setContactList(data.filter(contact => contact.name.length > 0))
			}
		})()
        
	}, [])
    

	const onSaveGroup = () => {
		saveGroup(groupToEdit)	
	}
    
	const onAddPersonToGroup = () => {
		if (!groupToEdit.people.includes(currentPerson)) {
			addPersonToGroup(currentPerson)
		}
		setCurrentPerson('')
	}
    
	return (
		<ScrollView>

			<View>
				<Text>{error}</Text>
			</View>
			
			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Name"
						label="Name" 
						style={styles.input} 
						value={currentPerson}
						onChangeText={text => setCurrentPerson(text)}
					/>

					{currentPerson.length > 0 && 
                        <Button mode="outlined" onPress={() => onAddPersonToGroup()}>
                            Add to group
                        </Button>
					}
				</View>
				
				<View style={styles.formControl}>
					{groupToEdit.people.map(person => { return (
						<View key={person} style={styles.row}>
							<View style={styles.rowItem}>
								<Text>{person}</Text>
							</View>
							<View style={styles.rowItem}>
								<Button style={styles.rowItem} compact={true} mode="text" uppercase={false} onPress={() => removePerson(person)}>
								(Remove)
								</Button> 
							</View>
						</View>
					)})}
				</View>

				<View style={styles.formControl}>
					<Button mode="contained" onPress={onSaveGroup}>
                        Save group
					</Button>
				</View>
                
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	formControl: {
		marginVertical: 5
	},
	row: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap: 'nowrap'
	}, 
	rowItem: {
		flex: 0
	}
})

EditGroupPeople.propTypes = {
	navigation: PropTypes.object,
	user: PropTypes.object,
	fetching: PropTypes.bool,
	error: PropTypes.string,
	groupToEdit: PropTypes.object,
	currentPerson: PropTypes.string,
	saveGroup: PropTypes.func,
	setCurrentPerson: PropTypes.func,
	addPersonToGroup: PropTypes.func,
	removePerson: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		fetching: state.groups.fetching,
		error: state.groups.error,
		groupToEdit: state.groups.groupToEdit,
		currentPerson: state.groups.currentPerson,
	}
}

const connectedEditGroupPeople = connect(
	mapStateToProps,
	{
		saveGroup,
		setCurrentPerson,
		addPersonToGroup,
		removePerson
	}
)(EditGroupPeople)

export default connectedEditGroupPeople