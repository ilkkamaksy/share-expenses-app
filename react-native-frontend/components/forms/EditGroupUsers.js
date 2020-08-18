import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, Share } from 'react-native'
import * as Linking from 'expo-linking'
import { Button } from 'react-native-paper'

import { doneEditing, removeGroupUser, setGroupToEdit, leaveGroup } from '../../store/actions/groups'

import { 
	addInvitation,
	removeInvitation, 
	getInvitationByGroup
} from '../../store/actions/invitations'

import Heading from '../UI/Heading'
import Paragraph from '../UI/Paragraph'
import Colors from '../../constants/Colors'

const EditGroupUsers = ({ 
	userdata,
	error, 
	groupToEdit, 
	openAccessInvitation,
	doneEditing,
	addInvitation,
	removeInvitation,
	getInvitationByGroup,
	removeGroupUser,
	leaveGroup,
	setGroupToEdit,
	navigation 
}) => {

	const [appUrl, setAppUrl] = useState(null)

	useEffect(() => {
		const getAppUrl = async () => {
			const initialUrl = await Linking.makeUrl('groups/', {
				id: groupToEdit.id
			})
			setAppUrl(initialUrl)
		}
		getAppUrl()
		getInvitationByGroup(groupToEdit.id)
	}, [])

	const onCreateOpenInvitation = async () => {
		await addInvitation(groupToEdit.id)
		await getInvitationByGroup(groupToEdit.id)
	}

	const onRemoveOpenInvitation = async () => {
		await removeInvitation(openAccessInvitation.id)
		await getInvitationByGroup(groupToEdit.id)
	}

	const onShareInvitation = async () => {
		try {
			await Share.share({
				message: `Join my group "${groupToEdit.title}" to track our shared expenses on ShareExpenses App: https://suuntastudios.com/shareapp/?to=${encodeURIComponent(appUrl)}`,
				subject: 'Invitation to manage a group in ShareExpenses App',
				title: 'Invitation to manage a group in ShareExpenses App'
			})
		} catch (error) {
			console.log(error.message)
		}
	}

	const onLeaveGroup = async () => {
		navigation.navigate('GroupList')
		await leaveGroup(userdata.user.id, groupToEdit.id)
		setGroupToEdit(null)
	}

	const onRemoveGroupUser = async (userid) => {
		await removeGroupUser(userid, groupToEdit.id)
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
				color: Colors.secondary, 
				textTransform: 'uppercase', 
				paddingBottom: 5 
			}]}>
				Invite friends to manage this group
			</Heading>

			<View style={styles.form}>
				
				<View style={styles.formControl}>
					<Paragraph style={[{ textAlign: 'left', fontSize: 13, color: Colors.lightCoffee }]}>
						Invite friends to join in to manage this group by open access invitation.
					</Paragraph>    

					<Button 
						disabled={openAccessInvitation ? false : true} 
						mode="contained" 
						onPress={() => onShareInvitation()}
						color={Colors.secondary}
						labelStyle={{ color: Colors.white, fontSize: 11 }}
					>
						Share open access invite
					</Button>

					<Paragraph style={[{ textAlign: 'center', fontSize: 10, marginTop: 5, color: Colors.lightCoffee }]}>
						Anyone with the invitation can join this group.
					</Paragraph>

					{!openAccessInvitation ?
			
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
						
						:
			
						<View style={{ marginTop: 20 }}>
							<Paragraph style={[{ textAlign: 'center', fontSize: 11, color: Colors.lightCoffee, lineHeight: 20 }]}>
								{`Open access invitation has been created on ${new Date(JSON.parse(openAccessInvitation.createdAt)).toLocaleDateString()} at ${new Date(JSON.parse(openAccessInvitation.createdAt)).toLocaleTimeString()} by ${openAccessInvitation.owner.email}.`}
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

							<Paragraph style={[{ textAlign: 'center', fontSize: 10, marginTop: 5, color: Colors.lightCoffee, lineHeight: 20 }]}>
								When removed, no one can join the group using it.
							</Paragraph>    
						</View>
					}
					
					
				</View>
				
				<Heading style={[{ 
					textAlign: 'left', 
					fontSize: 12, 
					color: Colors.secondary, 
					textTransform: 'uppercase', 
					marginTop: 60 
				}]}>
					Users managing this group
				</Heading>

				<View style={styles.formControl}>
					{groupToEdit.users.map(user => { 
						return (
							<View 
								key={user.id} 
								style={[styles.row, { borderBottomColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth }]}
							>
								<View style={styles.column}>
									<Text style={{ 
										fontSize: 13, 
										color: Colors.lightCoffee, 
										paddingVertical: 14
									}}
									>{user.email}</Text>
								</View>
								{userdata.user.id === groupToEdit.owner.id && user.id !== userdata.user.id ?
									<View style={styles.column}>
										<Button 
											labelStyle={{ color: Colors.primary, fontSize: 12 }}
											compact={true} 
											mode="text" 
											uppercase={false} 
											onPress={() => onRemoveGroupUser(user.id)}>
										Remove
										</Button> 
									</View>
									: <></>
								}
							
							</View>
						)})}
				</View>

				{userdata.user.id !== groupToEdit.owner.id &&
					<View style={[styles.formControl, { marginTop: 20 }]}>
						<Button 
							mode="outlined" 
							onPress={onLeaveGroup}
							color={Colors.primary}
							style={styles.doneButton}
						>
						Leave this group
						</Button>
					</View>
				} 
				

				<View style={[styles.formControl, { marginTop: 20 }]}>
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
	userdata: PropTypes.object,
	error: PropTypes.string,
	groupToEdit: PropTypes.object,
	openAccessInvitation: PropTypes.object,
	doneEditing: PropTypes.func,
	addInvitation: PropTypes.func,
	removeInvitation: PropTypes.func,
	getInvitationByGroup: PropTypes.func,
	removeGroupUser: PropTypes.func,
	leaveGroup: PropTypes.func,
	setGroupToEdit: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		userdata: state.user.userdata,
		error: state.groups.error,
		groupToEdit: state.groups.groupToEdit,
		openAccessInvitation: state.invitations.openAccessInvitation
	}
}

const connectedEditGroupUsers = connect(
	mapStateToProps,
	{
		doneEditing,
		addInvitation,
		removeInvitation,
		getInvitationByGroup,
		removeGroupUser,
		leaveGroup,
		setGroupToEdit
	}
)(EditGroupUsers)

export default connectedEditGroupUsers