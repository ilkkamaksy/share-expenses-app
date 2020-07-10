import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import Group from '../../components/groups/Group'

const GroupDetailScreen = props => {

	const groupId = props.route.params.id
	const selectedGroup = useSelector(state => 
		state.groups.userGroups.find(group => group.id === groupId))

	return (
		<ScrollView>
			<Group 
				title={selectedGroup.title}
				id={selectedGroup.id} 
				ownerId={selectedGroup.ownerId}
			/>
		</ScrollView>
	)
}

GroupDetailScreen.propTypes = {
	route: PropTypes.object
}

export default GroupDetailScreen