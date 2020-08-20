import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native'

import { setExpenseToEdit } from '../../store/actions/expenses'

import Group from '../../components/groups/Group'
import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import FloatingActionButton from '../../components/UI/FloatingActionButton'
import Edit from '../../components/icons/Edit'
import Share from '../../components/icons/Share'

import PopupMenuTopRight from '../../components/menus/PopupMenuTopRight'

const GroupDetailScreen = ({ 
	navigation, 
	groupToEdit, 
	setExpenseToEdit 
}) => {

	if (!groupToEdit.id) {
		navigation.navigate('GroupList')
		return <></>
	}

	const group = useSelector(state => state.groups.userGroups.find(group => group.id === groupToEdit.id))

	useEffect(() => {
		navigation.setOptions({ title: group.title })
	}, [group])

	const createNewExpense = () => {
		setExpenseToEdit({
			id: null,
			groupid: group.id,
			date: new Date(Date.now()),
			lastUpdatedAt: null,
			createdAt: null,
			description: '',
			amount: 0,
			people: groupToEdit.people,
			details: groupToEdit.people.map(person => {
				return {
					personId: person.id,
					share: 0,
					paid: 0,
					balance: 0
				}
			})
		})
		
		navigation.navigate('EditExpense')
	}

	return (
		<View style={styles.container}>

			<ScrollView>
				
				<Hero>
					<Heading style={[styles.header]}>
						{group.title}
					</Heading>

					{group.location && 
						<Paragraph style={[styles.intro]}>
							{group.location}
						</Paragraph>
					}

					<View style={styles.actions}>
						<View style={styles.row}>
							<TouchableOpacity 
								onPress={() => navigation.navigate('EditGroup')} 
								style={styles.actionLinkContainer}
							>
								<Edit size={14} color={Colors.white} />
								<Text style={styles.actionLink}>Edit Group</Text>
							</TouchableOpacity>
							<TouchableOpacity 
								onPress={() => navigation.navigate('EditGroup')} 
								style={styles.actionLinkContainer}
							>
								<Share size={14} color={Colors.white} />
								<Text style={styles.actionLink}>Invite friends</Text>
							</TouchableOpacity>
						</View>
					</View>

					<PopupMenuTopRight />

				</Hero>
				<ContentContainer>
					<Group 
						group={group}
						navigation={navigation}
					/>
				</ContentContainer>
			
			
			</ScrollView>

			
			<FloatingActionButton onPress={createNewExpense} labelText="Add a new expense" />
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		color: Colors.white,
		textAlign: 'left',
	},
	intro: {
		textAlign: 'left',
		color: Colors.white,
		fontSize: 14
	},
	container: {
		backgroundColor: Colors.white,
		flex: 1
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%'
	},
	actions: {
		marginTop: 20,
		marginBottom: -10,
		width: '100%'
	}, 
	actionLinkContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	actionLink: {
		textTransform: 'uppercase',
		color: Colors.white,
		fontSize: 11,
		fontWeight: 'bold',
		marginLeft: 4,
	}
})

GroupDetailScreen.propTypes = {
	navigation: PropTypes.object,
	groupToEdit: PropTypes.object,
	setExpenseToEdit: PropTypes.func,
	expenseToEdit: PropTypes.object
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const ConnectedGroupDetailScreen = connect(mapStateToProps, {
	setExpenseToEdit
})(GroupDetailScreen)

export default ConnectedGroupDetailScreen