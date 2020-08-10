import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet } from 'react-native'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import EditGroupInfo from '../../components/forms/EditGroupInfo'

const CreateGroupScreen = ({ navigation }) => {

	return (
		<ScrollView>
			<Hero>
				<Heading style={[styles.header]}>
					Add a new group
				</Heading>
				<Paragraph style={[styles.intro]}>
					Add a name and an optional location for your group.
				</Paragraph>
			</Hero>

			<ContentContainer>
				<EditGroupInfo navigation={navigation} />
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

CreateGroupScreen.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object,
	groupToEdit: PropTypes.object
}

export default CreateGroupScreen