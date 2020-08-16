import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, Share } from 'react-native'
import * as Linking from 'expo-linking'
import { Button } from 'react-native-paper'

import { 
	doneEditing, 
	addInvitation,
	removeInvitation, 
	getInvitationsByCurrentUser 
} from '../../store/actions/groups'

import Heading from '../UI/Heading'
import Paragraph from '../UI/Paragraph'
import Colors from '../../constants/Colors'

const EditGroupUsers = ({ 
	error, 
	groupToEdit, 
	ownedInvitations,
	doneEditing,
	addInvitation,
	removeInvitation,
	getInvitationsByCurrentUser,
	navigation 
}) => {

	const [appUrl, setAppUrl] = useState(null)
	const [currentInvitation, setCurrentInvitation] = useState(null)

	const oldOwnedInvites = ownedInvitations

	useEffect(() => {
		const getAppUrl = async () => {
			const initialUrl = await Linking.makeUrl('groups/', {
				id: groupToEdit.id
			})
			setAppUrl(initialUrl)
		}
		getAppUrl()
		if (ownedInvitations.length === 0 || ownedInvitations.length !== oldOwnedInvites.length) {
			getInvitationsByCurrentUser()
		}
		
		const foundInvite = ownedInvitations.find(invite => invite.group.id === groupToEdit.id)
		setCurrentInvitation(foundInvite ? foundInvite : null)
	}, [ownedInvitations])

	console.log('owned', ownedInvitations)

	const onCreateOpenInvitation = async () => {
		addInvitation(groupToEdit.id)
	}

	const onRemoveOpenInvitation = () => {
		const currentInvite = ownedInvitations.find(invite => invite.group.id === groupToEdit.id)
		removeInvitation(currentInvite.id)
	}

	const onShareInvitation = async () => {
		try {
			const result = await Share.share({
				message: `Join my group "${groupToEdit.title}" to track our shared expenses on ShareExpenses App: https://suuntastudios.com/shareapp/?to=${encodeURIComponent(appUrl)}`,
				subject: 'Invitation to manage a group in ShareExpenses App',
				title: 'Invitation to manage a group in ShareExpenses App'
			})
			if (result.action === Share.sharedAction) {
				console.log('invite shared')
			} else if (result.action === Share.dismissedAction) {
				// dismissed
				console.log('invite cancelled')
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	const publicUrlButton = () => {
		
		const existingInvite = ownedInvitations.find(invite => invite.group.id === groupToEdit.id)
		
		if (ownedInvitations.length === 0 || !existingInvite) {
			return (
				<View>
					<Paragraph style={[{ textAlign: 'left', fontSize: 11, color: Colors.lightCoffee, lineHeight: 20, marginTop: 20 }]}>
						Create open access invitation and share it with your friends. 
					</Paragraph>  
					<Button 
						disabled={false} 
						mode="contained" 
						onPress={() => onCreateOpenInvitation()}
						color={Colors.secondary}
						labelStyle={{ color: Colors.white, fontSize: 11 }}
					>
					Create open access invitation
					</Button>
				</View>
				
			)
		} else {
			return (
				<View style={{ marginTop: 20 }}>
					<Paragraph style={[{ textAlign: 'left', fontSize: 11, color: Colors.lightCoffee, lineHeight: 20 }]}>
						{`The open access invitation has been created on ${new Date(JSON.parse(existingInvite.createdAt)).toLocaleDateString()}. You can deactivate this invitation by clicking below, after which no one can join the group using it.`}
					</Paragraph>    
					<Button 
						disabled={false} 
						mode="outlined" 
						onPress={() => onRemoveOpenInvitation()}
						color={Colors.error}
						labelStyle={{ color: Colors.error, fontSize: 11 }}
					>
						Delete open access invite
					</Button>
				</View>
			)
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
			
			<Heading style={[{ 
				textAlign: 'left', 
				fontSize: 12, 
				color: Colors.secondary, 
				textTransform: 'uppercase', 
				paddingBottom: 5 
			}]}>
				Invite friends to manage this group
			</Heading>

			<View style={styles.form}>
				
				<View style={styles.formControl}>
					<Paragraph style={[{ textAlign: 'left', fontSize: 13, color: Colors.lightCoffee }]}>
						Invite friends to join in to manage this group by open access invitation. Note that anyone with the invitation can join this group.
					</Paragraph>    

					<Button 
						disabled={currentInvitation ? false : true} 
						mode="contained" 
						onPress={() => onShareInvitation()}
						color={Colors.secondary}
						labelStyle={{ color: Colors.white, fontSize: 11 }}
					>
						Share open access invite
					</Button>

					{publicUrlButton()}
					
					
				</View>
				
				<Heading style={[{ 
					textAlign: 'left', 
					fontSize: 12, 
					color: Colors.secondary, 
					textTransform: 'uppercase', 
					marginTop: 60 
				}]}>
					Users in this group
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
						mode="outlined" 
						onPress={onDoneEditingGroup}
						color={Colors.primary}
						style={styles.doneButton}
					>
                        Leave this group
					</Button>
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
	ownedInvitations: PropTypes.array,
	doneEditing: PropTypes.func,
	setCurrentPerson: PropTypes.func,
	addPersonToGroup: PropTypes.func,
	removePerson: PropTypes.func,
	addInvitation: PropTypes.func,
	removeInvitation: PropTypes.func,
	getInvitationsByCurrentUser: PropTypes.func,
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		fetching: state.groups.fetching,
		error: state.groups.error,
		groupToEdit: state.groups.groupToEdit,
		ownedInvitations: state.groups.ownedInvitations
	}
}

const connectedEditGroupUsers = connect(
	mapStateToProps,
	{
		doneEditing,
		addInvitation,
		removeInvitation,
		getInvitationsByCurrentUser
	}
)(EditGroupUsers)

export default connectedEditGroupUsers