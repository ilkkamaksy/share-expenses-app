import actions from '../actions/groups'

export const { setTitle, saveGroup, getGroups, removeGroup } = actions

const initialState = {
	editedGroupTitle: '',
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
			editedGroupTitle: action.title
		}
	case 'INIT_SAVE_GROUP' :
		return {
			...state,
			fetching: true,
			saveGroupFail: false,
			error: ''
		}
	case 'SAVE_GROUP_SUCCESS' :
		console.log(action.group)
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