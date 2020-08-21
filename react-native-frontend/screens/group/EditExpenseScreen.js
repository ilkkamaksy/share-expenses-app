import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import EditExpense from '../../components/forms/EditExpense'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import PopupMenuTopRight from '../../components/menus/PopupMenuTopRight'

const EditExpenseScreen = ({ navigation, groupToEdit, expenseToEdit }) => {
	
	const [title, setTitle] = useState(`Add a new expense to group "${groupToEdit.title}"`)

	useEffect(() => {
		if (expenseToEdit.id) {
			setTitle('Edit expense')
		}
	}, [])
	
	return (
		<View style={styles.container}>

			<ScrollView>
				
				<Hero>
					<Heading style={[styles.header]}>
						{title}
					</Heading>
					
					<PopupMenuTopRight />

				</Hero>

				<ContentContainer>
					<EditExpense navigation={navigation} />
				</ContentContainer>
			
			</ScrollView>

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

EditExpenseScreen.propTypes = {
	navigation: PropTypes.object,
	groupToEdit: PropTypes.object,
	expenseToEdit: PropTypes.object
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit,
		expenseToEdit: state.groups.expenseToEdit
	}
}

const ConnectedEditExpenseScreen = connect(mapStateToProps, {})(EditExpenseScreen)

export default ConnectedEditExpenseScreen