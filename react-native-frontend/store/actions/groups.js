import appService from '../../services/appService'
import userService from '../../services/userService'

const setTitle = (title) => {
	return async dispatch => {
		dispatch({
			type: 'SET_TITLE',
			title
		})
	}
}

const saveGroup = (args = {}) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_SAVE_GROUP',
		})

		const response = await appService.saveGroup(args)
				
		if (response.data.data.saveGroup === null || response === null) {
			return dispatch({
				type: 'SAVE_GROUP_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'SAVE_GROUP_SUCCESS',
			group: response.data.data.saveGroup
		})
	}
}

const getGroups = () =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_GET_GROUPS',
		})
		
		const response = await appService.getGroups()
		
		if (response.data.data.getGroups === null || response === null) {
			return dispatch({
				type: 'GET_GROUPS_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'GET_GROUPS_SUCCESS',
			groups: response.data.data.getGroups
		})
	}
}

const removeGroup = id =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_REMOVE_GROUP',
		})

		const response = await appService.removeGroup(id)
		
		if (response.data.data.removeGroup === null || response === null) {
			return dispatch({
				type: 'REMOVE_GROUP_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'REMOVE_GROUP_SUCCESS',
			removedGroupId: id
		})
	}
}

export default {
	setTitle,
	saveGroup,
	getGroups,
	removeGroup
}