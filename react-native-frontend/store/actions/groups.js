import * as appService from '../../services/appService'
import calculateTotals from '../../utils/calculateTotals'
import calculateBalances from '../../utils/calculateBalances'
import '../reducers/groups'

export const toggleTopRightMenu = visibility => {
	return dispatch => {
		dispatch({
			type: 'TOGGLE_TOP_RIGHT_MENU',
			visibility
		})
	}
}

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

export const setCurrentPerson = (person) => {
	return async dispatch => {
		dispatch({
			type: 'SET_CURRENT_PERSON',
			person
		})
	}
}

export const updateGroup = (group) =>  {
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

export const saveGroup = (group) =>  {
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

export const getGroups = (sort = { sortBy: 'lastUpdatedAt', order: -1 }) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_GET_GROUPS',
		})
		
		const response = await appService.getGroups(sort)
		
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

export const addPersonToGroup = ({ name, groupid }) =>  {
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

export const removePerson = id => {
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

export const doneEditing = group => {
	return dispatch => {
		dispatch({
			type: 'DONE_EDITING_GROUP',
			group
		})
	}
}

export const setExpenseToEdit = expense => {
	return dispatch => {
		dispatch({
			type: 'SET_EXPENSE_TO_EDIT',
			expense
		})
	}
}

export const setExpenseDate = (date) => {
	return async dispatch => {
		dispatch({
			type: 'SET_EXPENSE_DATE',
			date
		})
	}
}

export const addExpense = expenseData =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_CREATE_EXPENSE',
		})

		let data = expenseData
		delete data.id

		let response = await appService.addExpense(data)
		
		if (response.data.data.addExpense === null || response === null) {
			return dispatch({
				type: 'CREATE_EXPENSE_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'CREATE_EXPENSE_SUCCESS',
			group: response.data.data.addExpense
		})
	}
}

export const removeExpense = id =>  {
	return async dispatch => {
		dispatch({
			type: 'INIT_REMOVE_EXPENSE',
		})

		const response = await appService.removeExpense(id)
	
		if (response.data.data.removeExpense === null || response === null) {
			return dispatch({
				type: 'REMOVE_EXPENSE_FAIL',
				response: response.data.errors[0].message
			})
		}

		dispatch({
			type: 'REMOVE_EXPENSE_SUCCESS',
			removedExpenseId: id
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
