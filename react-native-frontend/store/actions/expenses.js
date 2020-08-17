import * as expenseService from '../../services/expenseService'
import '../reducers/groups'

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

		let response = await expenseService.addExpense(data)
		
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

		const response = await expenseService.removeExpense(id)
	
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