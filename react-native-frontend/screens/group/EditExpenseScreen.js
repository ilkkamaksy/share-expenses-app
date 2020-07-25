import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import EditExpense from '../../components/forms/EditExpense'

const EditExpenseScreen = props => {
		
	useEffect(() => {
		if (props.groupToEdit.id) {
			props.navigation.setOptions({title: 'Edit expense'})
		}
	}, [])
	
	return (
		<EditExpense navigation={props.navigation} />
	)
}

EditExpenseScreen.propTypes = {
	navigation: PropTypes.object,
	groupToEdit: PropTypes.object
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const ConnectedEditExpenseScreen = connect(mapStateToProps, {})(EditExpenseScreen)

export default ConnectedEditExpenseScreen