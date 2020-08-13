import React from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { ScrollView, StyleSheet, View } from 'react-native'

import ExpenseList from '../../components/groups/ExpenseList'
import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import PopupMenuTopRight from '../../components/menus/PopupMenuTopRight'

const GroupExpensesScreen = ({ 
	groupToEdit
}) => {

	const group = useSelector(state => state.groups.userGroups.find(group => group.id === groupToEdit.id))

	return (
		<View style={styles.container}>

			<ScrollView>
				
				<Hero>
					<Heading style={[styles.header]}>
						All expenses
					</Heading>
					<Paragraph style={[styles.intro]}>
						{`Group "${group.title}"`}
					</Paragraph>

				</Hero>
				<ContentContainer>
					<ExpenseList group={group} />
				</ContentContainer>
			
			
			</ScrollView>

			<PopupMenuTopRight />
			
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
		fontSize: 17
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

GroupExpensesScreen.propTypes = {
	groupToEdit: PropTypes.object,
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const ConnectedGroupExpensesScreen = connect(mapStateToProps, {})(GroupExpensesScreen)

export default ConnectedGroupExpensesScreen