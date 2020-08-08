import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View } from 'react-native'

import GroupList from '../../components/groups/GroupList'
import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import FloatingActionButton from '../../components/UI/FloatingActionButton'
import PopupMenuTopRight from '../../components/menus/PopupMenuTopRight'

import { setGroupToEdit } from '../../store/actions/groups'

const GroupsOverViewScreen = ({ navigation, setGroupToEdit }) => {
	
	const createNewGroup = () => {
		setGroupToEdit(null)
		navigation.navigate('CreateGroup')
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

			<PopupMenuTopRight />

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
	navigation: PropTypes.object,
	setGroupToEdit: PropTypes.func,
	groupToEdit: PropTypes.object
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const ConnectedGroupsOverViewScreen = connect(mapStateToProps, {
	setGroupToEdit
})(GroupsOverViewScreen)

export default ConnectedGroupsOverViewScreen