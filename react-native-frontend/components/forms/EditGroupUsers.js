import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { doneEditing } from '../../store/reducers/groups'

import Heading from '../UI/Heading'
import Colors from '../../constants/Colors'

const EditGroupUsers = ({ 
	error, 
	groupToEdit, 
	doneEditing,
	navigation 
}) => {

	
	const onInviteToGroup = () => {
		console.log('pressed')
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
			
			<Heading style={[{ 
				textAlign: 'left', 
				fontSize: 12, 
				color: Colors.secondary, 
				textTransform: 'uppercase', 
				paddingBottom: 5 
			}]}>
				Invite a friend to this group
			</Heading>

			<View style={styles.form}>
				
				<View style={styles.formControl}>
                        
					<Button 
						disabled={false} 
						mode="contained" 
						onPress={() => onInviteToGroup()}
						color={Colors.secondary}
						labelStyle={{ color: Colors.white }}
					>
                            Invite a friend
					</Button>
					
				</View>
				
				<Heading style={[{ 
					textAlign: 'left', 
					fontSize: 12, 
					color: Colors.secondary, 
					textTransform: 'uppercase', 
					marginTop: 20 
				}]}>
					Friends managing this group
				</Heading>

				<View style={styles.formControl}>
					{groupToEdit.users.map(user => { return (
						<View key={user.id} style={styles.row}>
							<View style={styles.column}>
								<Text>{user.email}</Text>
							</View>
							<View style={styles.column}>
								<Button 
									labelStyle={{ color: Colors.primary, fontSize: 12 }}
									compact={true} 
									mode="text" 
									uppercase={false} 
									onPress={() => console.log('pressed')}>
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

EditGroupUsers.propTypes = {
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
	}
}

const connectedEditGroupUsers = connect(
	mapStateToProps,
	{
		doneEditing,
	}
)(EditGroupUsers)

export default connectedEditGroupUsers