import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'
import PopupMenuTopRight from '../../components/menus/PopupMenuTopRight'

import EditAccount from '../../components/forms/EditAccount'

const EditAccountScreen = () => {

	return (
		<ScrollView>
			<Hero>
				<Heading style={[styles.header]}>
					My account
				</Heading>
				
				<PopupMenuTopRight />

			</Hero>

			<ContentContainer>
				<EditAccount />
			</ContentContainer>
				
		</ScrollView>
		
	)
}

const styles = StyleSheet.create({
	header: {
		color: Colors.white,
		textAlign: 'left',
		fontSize: 22
	},
})


export default EditAccountScreen