import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Button, ActivityIndicator } from 'react-native-paper'

import { doneEditing } from '../../store/actions/groups'
	
import { 
	setCurrentPerson, 
	addPerson, 
	removePerson 
} from '../../store/actions/people'

import Heading from '../UI/Heading'
import TextInput from '../UI/TextInput'
import Colors from '../../constants/Colors'

const EditGroupPeople = ({ 
	error, 
	fetching,
	groupToEdit, 
	currentPerson, 
	setCurrentPerson, 
	addPerson, 
	removePerson,
	doneEditing,
	navigation 
}) => {

	const onAddPerson = () => {
		if (!groupToEdit.people.includes(currentPerson) && currentPerson.trim().length > 0) {
			addPerson({ name: currentPerson.trim(), groupid: groupToEdit.id })
			setCurrentPerson('')
		}
	}
    
	const onDoneEditingGroup = () => {
		doneEditing(groupToEdit)
		navigation.navigate('GroupItem', { group: groupToEdit })
	}
   
	return (
		<ScrollView>

			<View>
				<Text>{error}</Text>
			</View>
			
			<Heading style={[{ textAlign: 'left', fontSize: 12, color: Colors.secondary, textTransform: 'uppercase', paddingBottom: 5 }]}>
				Add a new person to this group
			</Heading>

			<View style={styles.form}>
				<View style={styles.formControl}>
					
					<TextInput 
						accessibilityLabel="Name"
						label="Name" 
						placeholder="John Doe"
						value={currentPerson}
						onChangeText={text => setCurrentPerson(text)}
						error={false}
						errorText=""
						returnKeyType="next"
						mode="outlined"
					/>
						
				</View>

				<View style={[styles.formControl, { position: 'relative' }]}>
                        
					{fetching && <ActivityIndicator animating={true} color={Colors.primary} style={{ position: 'absolute', top: 10, width: '100%' }} />}

					<Button 
						disabled={currentPerson.length === 0 || fetching} 
						mode="contained" 
						onPress={() => onAddPerson()}
						color={Colors.secondary}
						labelStyle={{ color: Colors.white }}
					>
                            Add to group
					</Button>
					
				</View>
				
				<Heading style={[{ textAlign: 'left', fontSize: 12, color: Colors.secondary, textTransform: 'uppercase', marginTop: 20 }]}>
					People in this group
				</Heading>

				<View style={styles.formControl}>
					{groupToEdit.people.map(person => { return (
						<View key={person.id} style={styles.row}>
							<View style={styles.column}>
								<Text>{person.name}</Text>
							</View>
							<View style={styles.column}>
								<Button 
									labelStyle={{ color: Colors.primary, fontSize: 12 }}
									compact={true} 
									mode="text" 
									uppercase={false} 
									onPress={() => removePerson(person.id)}>
								Remove
								</Button> 
							</View>
						</View>
					)})}
				</View>

				<View style={styles.formControl}>
					<Button 
						mode="contained" 
						onPress={onDoneEditingGroup}
						color={Colors.primary}
						labelStyle={{ color: Colors.white }}
						style={styles.doneButton}
					>
                        Done
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
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap: 'nowrap'
	}, 
	column: {
		flex: 1
	},
	doneButton: {
		marginTop: 20
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
	addPerson: PropTypes.func,
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
		addPerson,
		removePerson
	}
)(EditGroupPeople)

export default connectedEditGroupPeople