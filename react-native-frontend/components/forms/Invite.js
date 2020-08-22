import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, StyleSheet, Share } from 'react-native'
import * as Linking from 'expo-linking'
import { Button, ActivityIndicator } from 'react-native-paper'

import { 
	addInvitation,
	removeInvitation, 
	getInvitationByGroup
} from '../../store/actions/invitations'

import Heading from '../UI/Heading'
import Paragraph from '../UI/Paragraph'
import Colors from '../../constants/Colors'

const Invite = ({ 
	error, 
	fetching,
	groupToEdit, 
	openAccessInvitation,
	addInvitation,
	removeInvitation,
	getInvitationByGroup,
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
				paddingBottom: 3 
			}]}>
				Invite friends
			</Heading>

			<View style={styles.form}>
									
				{!openAccessInvitation ?
			
					<View>
						<Paragraph style={[{ textAlign: 'left', fontSize: 13, color: Colors.lightCoffee, lineHeight: 20, marginTop: 10, marginBottom: 20 }]}>
								Create open invitation and share it with your friends. 
						</Paragraph>  

						<View style={{ position: 'relative' }}>
							
							{fetching && <ActivityIndicator animating={true} color={Colors.primary} style={{ position: 'absolute', top: 8, width: '100%' }} />}

							<Button 
								disabled={fetching} 
								mode="contained" 
								onPress={() => onCreateOpenInvitation()}
								color={Colors.primary}
								labelStyle={{ color: Colors.white, fontSize: 11 }}
							>
								Create open invitation
							</Button>
						</View>	
						
					</View>
						
					:

					<View style={{ marginTop: 0 }}>

						<Paragraph style={[{ textAlign: 'left', fontSize: 13, color: Colors.lightCoffee }]}>
								Invite friends to join in to manage this group.
						</Paragraph>    

						<Button 
							disabled={!openAccessInvitation || fetching} 
							mode="contained" 
							onPress={() => onShareInvitation()}
							color={Colors.primary}
							labelStyle={{ color: Colors.white, fontSize: 11 }}
						>
								Share open invite
						</Button>

						<Paragraph style={[{ textAlign: 'center', fontSize: 10, marginTop: 5, color: Colors.lightCoffee }]}>
								Anyone with the invitation can join this group.
						</Paragraph>

						<Paragraph style={[{ textAlign: 'center', fontSize: 11, color: Colors.lightCoffee, lineHeight: 20 }]}>
							{`Open invitation has been created on ${new Date(JSON.parse(openAccessInvitation.createdAt)).toLocaleDateString()} at ${new Date(JSON.parse(openAccessInvitation.createdAt)).toLocaleTimeString()} by ${openAccessInvitation.owner.email}.`}
						</Paragraph>    

						<View style={{ position: 'relative' }}>
							
							{fetching && <ActivityIndicator animating={true} color={Colors.primary} style={{ position: 'absolute', top: 8, width: '100%' }} />}

							<Button 
								disabled={fetching} 
								mode="outlined" 
								onPress={() => onRemoveOpenInvitation()}
								color={Colors.error}
								labelStyle={{ color: Colors.accent, fontSize: 11 }}
							>
								Delete open invite
							</Button>
						</View>	
						

						<Paragraph style={[{ textAlign: 'center', fontSize: 10, marginTop: 5, color: Colors.lightCoffee, lineHeight: 20 }]}>
								When removed, no one can join the group using it.
						</Paragraph>    
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

Invite.propTypes = {
	error: PropTypes.string,
	fetching: PropTypes.bool,
	groupToEdit: PropTypes.object,
	openAccessInvitation: PropTypes.object,
	addInvitation: PropTypes.func,
	removeInvitation: PropTypes.func,
	getInvitationByGroup: PropTypes.func,
}

const mapStateToProps = (state) => {
	return {
		error: state.invitations.error,
		fetching: state.invitations.fetching,
		groupToEdit: state.groups.groupToEdit,
		openAccessInvitation: state.invitations.openAccessInvitation
	}
}

const connectedInvite = connect(
	mapStateToProps,
	{
		addInvitation,
		removeInvitation,
		getInvitationByGroup,
	}
)(Invite)

export default connectedInvite