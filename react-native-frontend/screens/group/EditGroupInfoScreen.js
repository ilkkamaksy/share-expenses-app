import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import EditGroupInfo from '../../components/forms/EditGroupInfo'

const EditGroupInfoScreen = props => {
		
	useEffect(() => {
		if (props.groupToEdit.id) {
			props.navigation.setOptions({title: 'Edit group'})
		}
	}, [])
	
	return (
		<EditGroupInfo navigation={props.navigation} />
	)
}

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