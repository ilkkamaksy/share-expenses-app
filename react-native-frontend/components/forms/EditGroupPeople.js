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
import Paragraph from '../UI/Paragraph'
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

			{error.length > 0 && 
			<Paragraph style={[{ color: Colors.error }]}>
				{error}
			</Paragraph>
			}
			
			<Heading style={[{ 
				textAlign: 'left', 
				fontSize: 12, 
				color: Colors.primary, 
				textTransform: 'uppercase', 
				paddingBottom: 5 
			}]}>
				Add a new person to this group
			</Heading>

			<Paragraph style={[{ textAlign: 'left', fontSize: 13, marginBottom: 5, color: Colors.lightCoffee, lineHeight: 20 }]}>
				Add names of people in this group. All the names you add here can be used in group expenses. 
			</Paragraph>    

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
						color={Colors.primary}
						labelStyle={{ color: Colors.white }}
					>
                            Add to group
					</Button>
					
					<Paragraph style={[{ textAlign: 'left', fontSize: 10, marginVertical: 10, color: Colors.lightCoffee, lineHeight: 20 }]}>
						These are not invites to other users. Invite your friends to manage this group by editing group users. 
					</Paragraph>

				</View>
				
				<Heading style={[{ 
					textAlign: 'left', 
					fontSize: 12, 
					color: Colors.primary, 
					textTransform: 'uppercase', 
					marginTop: 20 
				}]}>
					Names of people in this group
				</Heading>

				<View style={styles.formControl}>
					{groupToEdit.people.map(person => { return (
						<View key={person.id} style={[styles.row, { borderBottomColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth }]}>
							<View style={styles.column}>
								<Text style={{ 
									fontSize: 13, 
									color: Colors.lightCoffee, 
									paddingVertical: 14
								}}>{person.name}</Text>
							</View>
							<View style={styles.column}>
								<Button 
									labelStyle={{ color: Colors.accent, fontSize: 11 }}
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