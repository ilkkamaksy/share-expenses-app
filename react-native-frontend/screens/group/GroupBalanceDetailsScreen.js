import React from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { ScrollView, StyleSheet, View } from 'react-native'

import GroupBalanceDetails from '../../components/groups/GroupBalanceDetails'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import PopupMenuTopRight from '../../components/menus/PopupMenuTopRight'

const GroupBalanceDetailScreen = ({ groupToEdit }) => {

	const group = useSelector(state => state.groups.userGroups.find(group => group.id === groupToEdit.id))

	return (
		<View style={styles.container}>

			<ScrollView>
				
				<Hero>
					<Heading style={[styles.header]}>
						Balance summary
					</Heading>
					<Paragraph style={[styles.intro]}>
						{`Group "${group.title}"`}
					</Paragraph>
					
				</Hero>

				<ContentContainer>
					
					<GroupBalanceDetails 
						group={group}
					/>

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
		fontSize: 17,
		fontWeight: 'normal'
	},
	container: {
		backgroundColor: Colors.white,
		flex: 1
	},
	
})

GroupBalanceDetailScreen.propTypes = {
	groupToEdit: PropTypes.object,
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const ConnectedGroupBalanceDetailScreen = connect(mapStateToProps, {})(GroupBalanceDetailScreen)

export default ConnectedGroupBalanceDetailScreen