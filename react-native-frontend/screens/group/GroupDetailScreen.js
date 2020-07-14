import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import Group from '../../components/groups/Group'

const GroupDetailScreen = props => {
	
	return (
		<ScrollView>
			<Group 
				group={props.route.params.group}
				navigation={props.navigation}
			/>
		</ScrollView>
	)
}

GroupDetailScreen.propTypes = {
	route: PropTypes.object,
	navigation: PropTypes.object
}

export default GroupDetailScreen