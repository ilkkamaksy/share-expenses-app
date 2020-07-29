import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import Group from '../../components/groups/Group'

import { setExpenseToEdit, setExpenseDate } from '../../store/reducers/groups'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import FloatingActionButton from '../../components/UI/FloatingActionButton'
import Edit from '../../components/icons/Edit'

import PopupMenuTopRight from '../../components/menus/PopupMenuTopRight'

const GroupDetailScreen = ({ navigation, route, setExpenseToEdit, setExpenseDate, expenseToEdit }) => {

	useEffect(() => {
		navigation.setOptions({title: route.params.group.title})
	}, [])

	const createNewExpense = () => {
		setExpenseToEdit(null)
		setExpenseToEdit({
			...expenseToEdit,
			groupid: route.params.group.id
		})
		setExpenseDate(new Date(Date.now()))
		navigation.navigate('EditExpense')
	}

	return (
		<View style={styles.container}>

			<ScrollView>
				
				<Hero>
					<Heading style={[styles.header]}>
						{route.params.group.title}
					</Heading>
					<Paragraph style={[styles.intro]}>
						{route.params.group.location}
					</Paragraph>

					<View style={styles.actions}>
						<View>
							<TouchableOpacity 
								onPress={() => navigation.navigate('EditGroupInfo')} 
								style={styles.actionLinkContainer}
							>
								<Edit size={14} color={Colors.white} />
								<Text style={styles.actionLink}>Edit</Text>
							</TouchableOpacity>
						</View>
					</View>
					
				</Hero>
				<ContentContainer>
					<Group 
						groupId={route.params.group.id}
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
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		bottom: 10,
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
		marginLeft: 4
	}
})

GroupDetailScreen.propTypes = {
	route: PropTypes.object,
	navigation: PropTypes.object,
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
	setExpenseDate
})(GroupDetailScreen)

export default ConnectedGroupDetailScreen