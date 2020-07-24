import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet } from 'react-native'
import Group from '../../components/groups/Group'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

const GroupDetailScreen = props => {

	useEffect(() => {
		props.navigation.setOptions({title: props.route.params.group.title})
	}, [])
	
	return (
		<ScrollView style={styles.container}>
			<Hero>
				<Heading style={styles.header}>
					{props.route.params.group.title}
				</Heading>
				<Paragraph style={styles.intro}>
					{props.route.params.group.location}
				</Paragraph>
			</Hero>
			<ContentContainer>
				<Group 
					group={props.route.params.group}
					navigation={props.navigation}
				/>
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

GroupDetailScreen.propTypes = {
	route: PropTypes.object,
	navigation: PropTypes.object
}

export default GroupDetailScreen