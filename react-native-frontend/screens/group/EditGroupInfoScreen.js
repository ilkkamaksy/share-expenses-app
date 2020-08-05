import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet } from 'react-native'


import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import EditGroupInfo from '../../components/forms/EditGroupInfo'

const EditGroupInfoScreen = ({ groupToEdit, navigation }) => {
		
	useEffect(() => {
		if (groupToEdit.id) {
			navigation.setOptions({title: 'Edit group'})
		}
	}, [])
	
	return (
		<ScrollView>
			<Hero>
				<Heading style={[styles.header]}>
					Edit group details
				</Heading>
				<Paragraph style={[styles.intro]}>
					{`Currently editing "${groupToEdit.title}"`}
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
	container: {
		backgroundColor: Colors.white,
		flex: 1
	},
})

EditGroupInfoScreen.propTypes = {
	navigation: PropTypes.object,
	groupToEdit: PropTypes.object
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const ConnectedEditGroupInfoScreen = connect(mapStateToProps, {})(EditGroupInfoScreen)

export default ConnectedEditGroupInfoScreen