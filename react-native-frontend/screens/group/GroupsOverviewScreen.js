import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet } from 'react-native'

import GroupList from '../../components/groups/GroupList'
import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

const GroupsOverViewScreen = ({navigation}) => {
	
	return (
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
		backgroundColor: Colors.white
	},
})


GroupsOverViewScreen.propTypes = {
	navigation: PropTypes.object
}

export default GroupsOverViewScreen