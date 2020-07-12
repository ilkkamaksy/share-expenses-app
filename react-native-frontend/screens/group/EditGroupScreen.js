import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import EditGroupInfo from '../../components/forms/EditGroupInfo'

const EditGroupScreen = props => {

	const groupId = props.route.params.id
	const selectedGroup = useSelector(state => 
		state.groups.userGroups.find(group => group.id === groupId))
        
	return (
		<EditGroupInfo navigation={props.navigation} selectedGroup={selectedGroup} />
	)
}

EditGroupScreen.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
}

export default EditGroupScreen