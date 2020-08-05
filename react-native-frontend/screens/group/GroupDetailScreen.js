import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native'

import { setGroupToEdit, setExpenseToEdit, setExpenseDate } from '../../store/reducers/groups'

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
	route, 
	setGroupToEdit,
	setExpenseToEdit 
}) => {

	const group = useSelector(state => state.groups.userGroups.find(group => group.id === route.params.group.id))

	useEffect(() => {
		setGroupToEdit(group)
		navigation.setOptions({title: route.params.group.title})
	}, [])

	const createNewExpense = () => {
		setExpenseToEdit({
			id: null,
			groupid: route.params.group.id,
			date: new Date(Date.now()),
			lastUpdatedAt: null,
			createdAt: null,
			description: '',
			amount: Number(0).toFixed(2),
			people: [],
			details: []
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
					<Paragraph style={[styles.intro]}>
						{group.location}
					</Paragraph>

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
					
				</Hero>
				<ContentContainer>
					<Group 
						group={group}
						navigation={navigation}
					/>
				</ContentContainer>
			
			
			</ScrollView>

			<PopupMenuTopRight />
			<FloatingActionButton onPress={createNewExpense} />
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		color: Colors.white,
		textAlign: 'left',
		fontSize: 26
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
		position: 'absolute',
		bottom: 10,
		width: '100%'
	}, 
	actionLinkContainer: {
		backgroundColor: Colors.primary,
		paddingVertical: 4,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center'
	},
	actionLink: {
		textTransform: 'uppercase',
		color: Colors.white,
		fontSize: 10,
		fontWeight: 'bold',
		marginLeft: 4,
		letterSpacing: 0.3
	}
})

GroupDetailScreen.propTypes = {
	route: PropTypes.object,
	navigation: PropTypes.object,
	setGroupToEdit: PropTypes.func,
	setExpenseToEdit: PropTypes.func,
	setExpenseDate: PropTypes.func,
	expenseToEdit: PropTypes.object
}

const mapStateToProps = state => {
	return {
		expenseToEdit: state.groups.expenseToEdit
	}
}

const ConnectedGroupDetailScreen = connect(mapStateToProps, {
	setExpenseToEdit,
	setExpenseDate,
	setGroupToEdit
})(GroupDetailScreen)

export default ConnectedGroupDetailScreen