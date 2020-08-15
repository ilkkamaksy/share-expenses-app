import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, Share } from 'react-native'
import * as Linking from 'expo-linking'
import { Button } from 'react-native-paper'

import { doneEditing } from '../../store/actions/groups'

import Heading from '../UI/Heading'
import Colors from '../../constants/Colors'

const EditGroupUsers = ({ 
	error, 
	groupToEdit, 
	doneEditing,
	navigation 
}) => {

	
	const [appUrl, setAppUrl] = useState(null)

	useEffect(() => {
		const getAppUrl = async () => {
			const initialUrl = await Linking.makeUrl('/', {
				group: groupToEdit.id
			})
			setAppUrl(initialUrl)
		}
		getAppUrl()
	}, [])

	console.log('appurl', appUrl)

	const onInviteToGroup = async () => {
		
		// await Linking.openURL(appUrl)
		try {
			const result = await Share.share({
				message: `Join my group "${groupToEdit.title}" to track our shared expenses on ShareExpenses App: https://expo.io/--/to-exp/${encodeURIComponent(appUrl)}`,
				subject: 'Invitation to manage a group in ShareExpenses App',
				title: 'Invitation to manage a group in ShareExpenses App'
			})
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
				// shared with activity type of result.activityType
				} else {
				// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message)
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