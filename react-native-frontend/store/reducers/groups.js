import actions from '../actions/groups'

export const { 
	setTitle, 
	setDate, 
	setLocation, 
	setCurrentPerson, 
	addPersonToGroup,
	removePerson, 
	saveGroup, 
	getGroups, 
	removeGroup } = actions

const initialState = {
	groupToEdit: {
		title: '',
		date: new Date(Date.now()),
		location: '',
		people: [],
		users: []
	},
	currentPerson: '',
	userGroups: [],
	fetching: true,
	error: '',
	saveGroupFail: false,
	getGroupsFail: false
}

const groupReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SET_TITLE' : 
		return {
			...state,
			groupToEdit: {...state.groupToEdit, title: action.title}
		}
	case 'SET_DATE' : 
		return {
			...state,
			groupToEdit: {...state.groupToEdit, date: action.date}
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
	case 'ADD_PERSON' : 
		return {
			...state,
			groupToEdit: {...state.groupToEdit, people: [...state.groupToEdit.people, action.person]}
		}
	case 'REMOVE_PERSON' : 
		return {
			...state,
			groupToEdit: {...state.groupToEdit, people: state.groupToEdit.people.filter(person => person !== action.person)}
		}
	case 'INIT_SAVE_GROUP' :
		return {
			...state,
			fetching: true,
			saveGroupFail: false,
			error: ''
		}
	case 'SAVE_GROUP_SUCCESS' :
		return {
			...state,
			userGroups: [action.group, ...state.userGroups],
			saveGroupFail: false,
			error: '',
			fetching: false,
		}
	case 'SAVE_GROUP_FAIL' :
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
	default: return state
	}
}

export default groupReducer