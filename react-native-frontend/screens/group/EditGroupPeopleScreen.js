import React from 'react'
import PropTypes from 'prop-types'
import EditGroupPeople from '../../components/forms/EditGroupPeople'

const EditGroupPeopleScreen = props => {
    
	return (
		<EditGroupPeople navigation={props.navigation} />
	)
}

EditGroupPeopleScreen.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
}

export default EditGroupPeopleScreen