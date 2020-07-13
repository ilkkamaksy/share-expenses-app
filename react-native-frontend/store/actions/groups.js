import appService from '../../services/appService'

const setTitle = (title) => {
	return async dispatch => {
		dispatch({
			type: 'SET_TITLE',
			title
		})
	}
}

const setDate = (date) => {
	return async dispatch => {
		dispatch({
			type: 'SET_DATE',
			date
		})
	}
}

const setLocation = (location) => {
	return async dispatch => {
		dispatch({
			type: 'SET_LOCATION',
			location
		})
	}
}

const setCurrentPerson = (person) => {
	return async dispatch => {
		dispatch({
			type: 'SET_CURRENT_PERSON',
			person
		})
	}
}

const addPersonToGroup = (person) => {
	return async dispatch => {
		dispatch({
			type: 'ADD_PERSON',
			person
		})
	}
}

const removePerson = (person) => {
	return async dispatch => {
		dispatch({
			type: 'REMOVE_PERSON',
			person
		})
	}
}

const saveGroup = (group) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_SAVE_GROUP',
		})

		const response = await appService.saveGroup(group)
					
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
	setDate,
	setLocation,
	setCurrentPerson,
	addPersonToGroup,
	removePerson,
	saveGroup,
	getGroups,
	removeGroup,
}