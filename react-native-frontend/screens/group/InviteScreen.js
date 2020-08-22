import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet } from 'react-native'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import Invite from '../../components/forms/Invite'

const InviteScreen = () => {

	return (
		<ScrollView>
			<Hero>
				<Heading style={[styles.header]}>
					Invite firends
				</Heading>
				<></>
			</Hero>

			<ContentContainer>
				<Invite />
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

InviteScreen.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object,
	groupToEdit: PropTypes.object
}

export default InviteScreen