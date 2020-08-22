import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet } from 'react-native'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'
import EditGroupPeople from '../../components/forms/EditGroupPeople'

const AddGroupPeopleScreen = ({ navigation }) => {
	
	return (
		<ScrollView>
			<Hero>
				<Heading style={[styles.header]}>
					Add people to group
				</Heading>
				<></>
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