import appService from '../../services/appService'

const setGroupToEdit = group => {
	return dispatch => {
		dispatch({
			type: 'SET_GROUP_TO_EDIT',
			group
		})
	}
}

const setGroupTitle = (title) => {
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

const setGroupLocation = (location) => {
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

const updateGroup = (group) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_UPDATE_GROUP',
		})

		const response = await appService.updateGroup(group)
		
		if (response.data.data.updateGroup === null || response === null) {
			return dispatch({
				type: 'UPDATE_GROUP_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'UPDATE_GROUP_SUCCESS',
			group: response.data.data.updateGroup
		})
	}
}

const saveGroup = (group) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_CREATE_GROUP',
		})

		const response = await appService.saveGroup(group)
		
		if (response.data.data.createGroup === null || response === null) {
			return dispatch({
				type: 'CREATE_GROUP_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'CREATE_GROUP_SUCCESS',
			group: response.data.data.createGroup
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

const addPersonToGroup = ({ name, groupid }) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_UPDATE_GROUP',
		})

		const response = await appService.addPersonToGroup({ name, groupid })
		
		if (response.data.data.addPersonToGroup === null || response === null) {
			return dispatch({
				type: 'UPDATE_GROUP_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'ADD_PERSON_TO_GROUP_SUCCESS',
			person: response.data.data.addPersonToGroup
		})
	}
}

const removePerson = id => {
	return async dispatch => {

		dispatch({
			type: 'INIT_UPDATE_GROUP',
		})

		const response = await appService.removePerson(id)
		
		if (response.data.data.removePerson === null || response === null) {
			return dispatch({
				type: 'UPDATE_GROUP_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'REMOVE_PERSON_SUCCESS',
			id: response.data.data.removePerson.id
		})
	}
}

const doneEditing = group => {
	return dispatch => {
		dispatch({
			type: 'DONE_EDITING_GROUP',
			group
		})
	}
}

export default {
	setGroupToEdit,
	setGroupTitle,
	setDate,
	setGroupLocation,
	setCurrentPerson,
	saveGroup,
	updateGroup,
	getGroups,
	removeGroup,
	addPersonToGroup,
	removePerson,
	doneEditing
}