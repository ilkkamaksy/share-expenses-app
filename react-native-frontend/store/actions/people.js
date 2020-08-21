import * as personService from '../../services/personService'
import '../reducers/groups'

export const setCurrentPerson = (person) => {
	return async dispatch => {
		dispatch({
			type: 'SET_CURRENT_PERSON',
			person
		})
	}
}

export const addPerson = ({ name, groupid }) =>  {
	return async dispatch => {

		dispatch({
			type: 'INIT_UPDATE_GROUP',
		})

		const response = await personService.addPerson({ name, groupid })
		
		if (!response || response.data.errors) {
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

		const response = await personService.removePerson(id)
		
		if (!response || response.data.errors) {
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