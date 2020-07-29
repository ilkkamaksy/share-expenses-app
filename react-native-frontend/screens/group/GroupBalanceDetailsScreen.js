import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View } from 'react-native'

import GroupBalanceDetails from '../../components/groups/GroupBalanceDetails'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import PopupMenuTopRight from '../../components/menus/PopupMenuTopRight'

const GroupBalanceDetailScreen = ({ route }) => {

	const group = route.params.group

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
		fontSize: 14
	},
	container: {
		backgroundColor: Colors.white,
		flex: 1
	},
	
})

GroupBalanceDetailScreen.propTypes = {
	route: PropTypes.object,
}

export default GroupBalanceDetailScreen