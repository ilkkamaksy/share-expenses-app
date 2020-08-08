const initialState = {
	topRightMenuVisible: false,
	groupToEdit: {
		title: '',
		location: '',
		people: [],
		users: [],
		id: null,
		lastUpdatedAt: null,
		createdAt: null,
		expenses: []
	},
	currentPerson: '',
	expenseToEdit: {
		id: null,
		groupid: null,
		date: null,
		lastUpdatedAt: null,
		createdAt: null,
		description: '',
		amount: Number(0).toFixed(2),
		people: [],
		details: []
	},
	userGroups: [],
	fetching: true,
	error: '',
	saveGroupFail: false,
	getGroupsFail: false
}

const groupReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'TOGGLE_TOP_RIGHT_MENU' : 
		return {
			...state,
			topRightMenuVisible: action.visibility
		}
	case 'SET_GROUP_TO_EDIT' : 
		return {
			...state,
			groupToEdit: action.group ? action.group : initialState.groupToEdit,
			expenseToEdit: {
				...state.expenseToEdit,
				groupid: action.group ? action.group.id : initialState.expenseToEdit.groupid
			}
		}
	case 'SET_TITLE' : 
		return {
			...state,
			groupToEdit: {...state.groupToEdit, title: action.title}
		}
	case 'SET_LOCATION' : 
		return {
			...state,
			groupToEdit: {...state.groupToEdit, location: action.location}
		}
	case 'SET_CURRENT_PERSON' : 
		return {
			...state,
			currentPerson: action.person
		}
	case 'SET_EXPENSE_TO_EDIT' : 
		return {
			...state,
			expenseToEdit: action.expense ? action.expense : initialState.expenseToEdit
		}
	case 'SET_EXPENSE_DATE' : 
		return {
			...state,
			expenseToEdit: {...state.expenseToEdit, date: action.date}
		}
	case 'INIT_CREATE_GROUP' :
		return {
			...state,
			fetching: true,
			saveGroupFail: false,
			error: ''
		}
	case 'CREATE_GROUP_SUCCESS' :
		return {
			...state,
			userGroups: [action.group, ...state.userGroups],
			groupToEdit: action.group,
			saveGroupFail: false,
			error: '',
			fetching: false,
		}
	case 'CREATE_GROUP_FAIL' :
		return {
			...state,
			saveGroupFail: true,
			error: action.response,
			fetching: false
		}
	case 'INIT_GET_GROUPS' :
		return {
			...state,
			fetching: true,
			error: ''
		}
	case 'GET_GROUPS_SUCCESS' :
		return {
			...state,
			userGroups: action.groups,
			error: '',
			fetching: false,
		}
	case 'GET_GROUPS_FAIL' :
		return {
			...state,
			getGroupsFail: true,
			error: action.response,
			fetching: false
		}
	case 'INIT_REMOVE_GROUP' :
		return {
			...state,
			error: ''
		}
	case 'REMOVE_GROUP_SUCCESS' :
		return {
			...state,
			userGroups: state.userGroups.filter(group => group.id !== action.removedGroupId)
		}
	case 'REMOVE_GROUP_FAIL' :
		return {
			...state,
			error: action.response
		}
	case 'INIT_UPDATE_GROUP' : 
		return {
			...state,
			error: ''
		}
	case 'UPDATE_GROUP_FAIL' : 
		return {
			...state,
			error: action.response
		}
	case 'UPDATE_GROUP_SUCCESS' :
		return {
			...state,
			userGroups: state.userGroups.map(group => group.id === action.group.id ? action.group : group),
			groupToEdit: action.group,
			saveGroupFail: false,
			error: '',
		}
	case 'ADD_PERSON_TO_GROUP_SUCCESS' : 
		return {
			...state,
			groupToEdit: {
				...state.groupToEdit, 
				people: [...state.groupToEdit.people, action.person]
			},
		}
	case 'REMOVE_PERSON_SUCCESS' : 
		return {
			...state,
			groupToEdit: {
				...state.groupToEdit, 
				people: state.groupToEdit.people.filter(person => person.id !== action.id)
			}
		}
	case 'DONE_EDITING_GROUP' : 
		return {
			...state,
			userGroups: state.userGroups.map(group => group.id === action.group.id ? action.group : group)
		}
	case 'INIT_CREATE_EXPENSE' :
		return {
			...state,
			fetching: true,
			saveGroupFail: false,
			error: ''
		}
	case 'CREATE_EXPENSE_SUCCESS' :
		console.log('create expense success', action.group)
		return {
			...state,
			saveGroupFail: false,
			error: '',
			fetching: false,
			userGroups: state.userGroups.map(group => group.id === action.group.id ? action.group : group),
		}
	case 'CREATE_EXPENSE_FAIL' :
		return {
			...state,
			saveGroupFail: true,
			error: action.response,
			fetching: false
		}
	case 'INIT_REMOVE_EXPENSE' :
		return {
			...state,
			error: ''
		}
	case 'REMOVE_EXPENSE_SUCCESS' :
		return {
			...state,
			userGroups: state.userGroups.map(group => {
				const expenses = group.expenses.filter(expense => expense.id !== action.removedExpenseId)
				return {
					...group,
					expenses
				}
			})
		}
	case 'REMOVE_EXPENSE_FAIL' :
		return {
			...state,
			error: action.response
		}
	default: return state
	}
}

export default groupReducer