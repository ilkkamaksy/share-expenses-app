import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View } from 'react-native'

import GroupList from '../../components/groups/GroupList'
import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import FloatingActionButton from '../../components/UI/FloatingActionButton'

const GroupsOverViewScreen = ({navigation}) => {
	
	const createNewGroup = () => {
		// setGroupToEdit(null)
		navigation.navigate('EditGroupInfo')
	}

	return (
		<View style={styles.container}>
			<ScrollView style={styles.container}>
				<Hero>

					<Heading style={[styles.header]}>
					My groups
					</Heading>
					<Paragraph style={[styles.intro]}>
					Browse you groups.
					</Paragraph>
				</Hero>
				
				<ContentContainer>
					<GroupList navigation={navigation} />
				</ContentContainer>
			
			</ScrollView>

			<FloatingActionButton onPress={createNewGroup} labelText="Add a new group" />

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


GroupsOverViewScreen.propTypes = {
	navigation: PropTypes.object
}

export default GroupsOverViewScreen