import React from 'react'
import PropTypes from 'prop-types'
import GroupList from '../../components/groups/GroupList'

const GroupsOverViewScreen = ({navigation}) => {
	
	return (
		<GroupList navigation={navigation} />
	) 
}

GroupsOverViewScreen.propTypes = {
	navigation: PropTypes.object
}

export default GroupsOverViewScreen