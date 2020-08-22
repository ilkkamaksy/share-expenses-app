import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { doneEditing, removeGroupUser, setGroupToEdit, leaveGroup } from '../../store/actions/groups'

import Heading from '../UI/Heading'
import Paragraph from '../UI/Paragraph'
import Colors from '../../constants/Colors'

import Invite from './Invite'

const EditGroupUsers = ({ 
	userdata,
	error, 
	groupToEdit, 
	doneEditing,
	removeGroupUser,
	leaveGroup,
	setGroupToEdit,
	navigation 
}) => {

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
		navigation.navigate('GroupItem')
	}

	return (
		<ScrollView>

			{error.length > 0 && 
			<Paragraph style={[{ color: Colors.error }]}>
				{error}
			</Paragraph>
			}
			
			<Invite />

			<View style={styles.form}>
	
				<Heading style={[{ 
					textAlign: 'left', 
					fontSize: 12, 
					color: Colors.primary, 
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
							color={Colors.accent}
							style={styles.doneButton}
							labelStyle={{ fontSize: 12 }}
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
						labelStyle={{ color: Colors.white, fontSize: 12 }}
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
	doneEditing: PropTypes.func,
	removeGroupUser: PropTypes.func,
	leaveGroup: PropTypes.func,
	setGroupToEdit: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		userdata: state.user.userdata,
		error: state.groups.error,
		groupToEdit: state.groups.groupToEdit,
	}
}

const connectedEditGroupUsers = connect(
	mapStateToProps,
	{
		doneEditing,
		removeGroupUser,
		leaveGroup,
		setGroupToEdit
	}
)(EditGroupUsers)

export default connectedEditGroupUsers