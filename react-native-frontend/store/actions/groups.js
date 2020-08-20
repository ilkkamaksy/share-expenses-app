import * as groupService from '../../services/groupService'
import calculateTotals from '../../utils/calculateTotals'
import calculateBalances from '../../utils/calculateBalances'
import '../reducers/groups'

export const setGroupToEdit = group => {
	return dispatch => {
		dispatch({
			type: 'SET_GROUP_TO_EDIT',
			group
		})
	}
}

export const setGroupTitle = (title) => {
	return async dispatch => {
		dispatch({
			type: 'SET_TITLE',
			title
		})
	}
}

export const setGroupLocation = (location) => {
	return async dispatch => {
		dispatch({
			type: 'SET_LOCATION',
			location
		})
	}
}

export const updateGroup = (group) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_UPDATE_GROUP',
		})

		const response = await groupService.updateGroup(group)
		
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

export const createGroup = (group) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_CREATE_GROUP',
		})

		const response = await groupService.createGroup(group)
		
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

export const getGroups = (sort = { sortBy: 'lastUpdatedAt', order: -1 }) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_GET_GROUPS',
		})
		
		const response = await groupService.getGroups(sort)

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

export const removeGroup = id =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_REMOVE_GROUP',
		})

		const response = await groupService.removeGroup(id)
		
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

export const doneEditing = group => {
	return dispatch => {
		dispatch({
			type: 'DONE_EDITING_GROUP',
			group
		})
	}
}

export const removeGroupUser = (userid, groupid) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_UPDATE_GROUP',
		})

		const response = await groupService.removeGroupUser(userid, groupid)
		
		if (!response || response.data.errors) {
			return dispatch({
				type: 'UPDATE_GROUP_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'REMOVE_GROUP_USER_SUCCESS',
			userid
		})
	}
}

export const leaveGroup = (userid, groupid) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_UPDATE_GROUP',
		})

		const response = await groupService.removeGroupUser(userid, groupid)
		
		if (!response || response.data.errors) {
			return dispatch({
				type: 'UPDATE_GROUP_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'LEAVE_GROUP_SUCCESS',
			groupid
		})
	}
}

export const setGroupTotals = group => {
	return dispatch => {
		
		const groupTotals = calculateTotals(group)
	
		dispatch({
			type: 'SET_GROUP_TOTALS',
			groupTotals
		})	
	}	
}

export const setGroupBalanceData = (group) => {
	return dispatch => {
		
		dispatch({
			type: 'INIT_GROUP_BALANCEDATA'
		})

		const groupBalanceData = calculateBalances(group)

		dispatch({
			type: 'SET_GROUP_BALANCEDATA',
			groupBalanceData
		})	
	}
}