import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'

import { setCurrentPerson, addPersonToGroup, removePerson, doneEditing } from '../../store/reducers/groups'
import contactsService from '../../services/contactsService'

const EditGroupPeople = props => {

	console.log('editgrouppeople component', props.groupToEdit)
	const { 
		error, 
		groupToEdit, 
		currentPerson, 
		setCurrentPerson, 
		addPersonToGroup, 
		removePerson,
		doneEditing,
		navigation } = props

	const [contactList, setContactList] = useState({})

	// useEffect(() => {
	// 	(async () => {
	// 		const data = await contactsService.getContactsFromDevice()
	// 		if (data.length > 0) {
	// 			setContactList(data.filter(contact => contact.name.length > 0))
	// 		}
	// 	})()
        
	// }, [])
    

	const onAddPersonToGroup = () => {
		if (!groupToEdit.people.includes(currentPerson) && currentPerson.trim().length > 0) {
			addPersonToGroup({ name: currentPerson.trim(), groupid: groupToEdit.id })
			setCurrentPerson('')
		}
	}
    
	const onDoneEditingGroup = () => {
		doneEditing(groupToEdit)
		navigation.navigate('GroupList')
	}
   
	return (
		<ScrollView>

			<View>
				<Text>{error}</Text>
			</View>
			
			<View style={styles.form}>
				<View style={styles.formControl}>
					<View style={styles.row}>
						<View style={styles.column}>
							<TextInput 
								accessibilityLabel="Name"
								label="Name" 
								style={styles.input} 
								value={currentPerson}
								onChangeText={text => setCurrentPerson(text)}
							/>
						</View>
						<View style={styles.column}>
                        
							<Button 
								disabled={currentPerson.length === 0 ? true : false} 
								mode="outlined" 
								onPress={() => onAddPersonToGroup()}
							>
                            Add to group
							</Button>
					
						</View>
					</View>
				</View>
				
				<View style={styles.formControl}>
					{groupToEdit.people.map(person => { return (
						<View key={person.id} style={styles.row}>
							<View style={styles.column}>
								<Text>{person.name}</Text>
							</View>
							<View style={styles.column}>
								<Button 
									style={styles.column} 
									compact={true} 
									mode="text" 
									uppercase={false} 
									onPress={() => removePerson(person.id)}>
								(Remove)
								</Button> 
							</View>
						</View>
					)})}
				</View>

				<View style={styles.formControl}>
					<Button mode="contained" onPress={onDoneEditingGroup}>
                        Done
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
	column: {
		flex: 1
	},
	input: {
		width: '100%'
	}
})

EditGroupPeople.propTypes = {
	navigation: PropTypes.object,
	user: PropTypes.object,
	fetching: PropTypes.bool,
	error: PropTypes.string,
	groupToEdit: PropTypes.object,
	currentPerson: PropTypes.string,
	doneEditing: PropTypes.func,
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
		doneEditing,
		setCurrentPerson,
		addPersonToGroup,
		removePerson
	}
)(EditGroupPeople)

export default connectedEditGroupPeople