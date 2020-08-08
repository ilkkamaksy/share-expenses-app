import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet } from 'react-native'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'
import EditGroupPeople from '../../components/forms/EditGroupPeople'

const AddGroupPeopleScreen = ({ navigation }) => {
	
	return (
		<ScrollView>
			<Hero>
				<Heading style={[styles.header]}>
					Add people to your new group
				</Heading>
				<Paragraph style={[styles.intro]}>
					Add the names of people in this group.
				</Paragraph>
			</Hero>

			<ContentContainer>
				<EditGroupPeople navigation={navigation} />
			</ContentContainer>
		</ScrollView>
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
})

AddGroupPeopleScreen.propTypes = {
	navigation: PropTypes.object
}

export default AddGroupPeopleScreen