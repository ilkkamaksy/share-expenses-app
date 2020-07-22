import reducer from './groups'
import * as actions from '../actions/groups'

describe('test group reducer', () => {

	let initialState
    
	beforeEach(() => {
		initialState = {
			groupToEdit: {
				title: '',
				location: '',
				people: [],
				users: [],
				id: null
			},
			currentPerson: '',
			userGroups: [],
			fetching: true,
			error: '',
			saveGroupFail: false,
			getGroupsFail: false
		}
	})

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	})


	it('should handle SET_GROUP_TO_EDIT', () => {

		const group = {
			title: 'g1 title',
			location: 'l1',
			people: ['p1'],
			users: ['u1'],
			id: 'g1'
		}

		expect(
			reducer([], {
				type: 'SET_GROUP_TO_EDIT',
				group
			})
		).toEqual(
			{
				groupToEdit: group
			}
		)		
	})
    
	it('should handle SET_TITLE', () => {

		expect(
			reducer([], {
				type: 'SET_TITLE',
				title: 'changed title'
			})
		).toEqual(
			{
				groupToEdit: {
					title: 'changed title'
				}
				
			}
		)		
	})

	it('should handle SET_LOCATION', () => {

		expect(
			reducer([], {
				type: 'SET_LOCATION',
				location: 'changed location'
			})
		).toEqual(
			{
				groupToEdit: {
					location: 'changed location'
				}
				
			}
		)		
	})
    
	it('should handle SET_CURRENT_PERSON', () => {
		expect(
			reducer([], {
				type: 'SET_CURRENT_PERSON',
				person: 'Test Person' 
			})
		).toEqual(
			{
				currentPerson: 'Test Person',
			}
		)		
	})

	it('should handle INIT_CREATE_GROUP', () => {

		expect(
			reducer([], {
				type: 'INIT_CREATE_GROUP'
			})
		).toEqual(
			{
				fetching: true,
				saveGroupFail: false,
				error: ''
			}
		)		
	})

	it('should handle CREATE_GROUP_SUCCESS', () => {

		const group = {
			title: 'group title',
			location: 'l1',
			people: ['p1'],
			users: ['u1'],
			id: 'g1'
		}

		expect(
			reducer(initialState, {
				type: 'CREATE_GROUP_SUCCESS',
				group
			})
		).toEqual(
			{
				...initialState,
				userGroups: [group, ...initialState.userGroups],
				groupToEdit: group,
				saveGroupFail: false,
				error: '',
				fetching: false,
			}
		)		
	})

	it('should handle CREATE_GROUP_FAIL', () => {

		const error = 'fail'

		expect(
			reducer(initialState, {
				type: 'CREATE_GROUP_FAIL',
				response: error
			})
		).toEqual(
			{
				...initialState,
				saveGroupFail: true,
				error,
				fetching: false
			}
		)		
	})

	it('should handle INIT_GET_GROUPS', () => {

		expect(
			reducer(initialState, {
				type: 'INIT_GET_GROUPS'
			})
		).toEqual(
			{
				...initialState,
				fetching: true,
				error: ''
			}
		)		
	})

	it('should handle GET_GROUPS_SUCCESS', () => {

		const groups = [
			{
				title: 'g1',
				location: 'l1',
				people: ['p1'],
				users: ['u1'],
				id: 'g1'
			},
			{
				title: 'g2',
				location: 'l1',
				people: ['p1'],
				users: ['u1'],
				id: 'g2'
			}
		]

		expect(
			reducer(initialState, {
				type: 'GET_GROUPS_SUCCESS',
				groups
			})
		).toEqual(
			{
				...initialState,
				userGroups: groups,
				error: '',
				fetching: false,
			}
		)		
	})

	it('should handle GET_GROUPS_FAIL', () => {

		const error = 'fail'

		expect(
			reducer(initialState, {
				type: 'GET_GROUPS_FAIL',
				response: error
			})
		).toEqual(
			{
				...initialState,
				getGroupsFail: true,
				error: error,
				fetching: false
			}
		)		
	})

	it('should handle INIT_REMOVE_GROUP', () => {

		expect(
			reducer(initialState, {
				type: 'INIT_REMOVE_GROUP'
			})
		).toEqual(
			{
				...initialState,
				error: ''
			}
		)		
	})

	it('should handle REMOVE_GROUP_SUCCESS', () => {

		const removedGroupId = 'g1'

		expect(
			reducer(initialState, {
				type: 'REMOVE_GROUP_SUCCESS',
				removedGroupId
			})
		).toEqual(
			{
				...initialState,
				userGroups: initialState.userGroups.filter(group => group.id !== removedGroupId)
			}
		)		
	})

	it('should handle REMOVE_GROUP_FAIL', () => {

		const error = 'fail'

		expect(
			reducer(initialState, {
				type: 'REMOVE_GROUP_FAIL',
				response: error
			})
		).toEqual(
			{
				...initialState,
				error
			}
		)		
	})

	it('should handle INIT_UPDATE_GROUP', () => {

		expect(
			reducer(initialState, {
				type: 'INIT_UPDATE_GROUP'
			})
		).toEqual(
			{
				...initialState,
				error: ''
			}
		)		
	})

	it('should handle UPDATE_GROUP_FAIL', () => {

		const error = 'fail'

		expect(
			reducer(initialState, {
				type: 'UPDATE_GROUP_FAIL',
				response: error
			})
		).toEqual(
			{
				...initialState,
				error
			}
		)		
	})

	it('should handle UPDATE_GROUP_SUCCESS', () => {

		const group = {
			title: 'new group title',
			location: 'new location',
			people: ['p1'],
			users: ['u1'],
			id: 'g1'
		}
		
		expect(
			reducer(initialState, {
				type: 'UPDATE_GROUP_SUCCESS',
				group
			})
		).toEqual(
			{
				...initialState,
				userGroups: initialState.userGroups.map(group => group.id === group.id ? group : group),
				groupToEdit: group,
				saveGroupFail: false,
				error: '',
			}
		)		
	})

	it('should handle ADD_PERSON_TO_GROUP_SUCCESS and REMOVE_PERSON_SUCCESS', () => {

		const person = {
			name: 'new person',
			id: 'p2',
		}
		
		expect(
			reducer(initialState, {
				type: 'ADD_PERSON_TO_GROUP_SUCCESS',
				person
			})
		).toEqual(
			{
				...initialState,
				groupToEdit: {...initialState.groupToEdit, people: [...initialState.groupToEdit.people, person]}
			}
		)
		
		const id = 'p2'

		expect(
			reducer(initialState, {
				type: 'REMOVE_PERSON_SUCCESS',
				id
			})
		).toEqual(
			{
				...initialState,
				groupToEdit: {...initialState.groupToEdit, people: initialState.groupToEdit.people.filter(person => person.id !== id)}
			}
		)
	})

	it('should handle DONE_EDITING_GROUP', () => {

		const group = {
			title: 'new group title',
			location: 'new location',
			people: ['p1', 'p2', 'p3'],
			users: ['u1', 'u2'],
			id: 'g1'
		}
		
		expect(
			reducer(initialState, {
				type: 'DONE_EDITING_GROUP',
				group
			})
		).toEqual(
			{
				...initialState,
				groupToEdit: initialState.groupToEdit,
				userGroups: initialState.userGroups.map(group => group.id === group.id ? group : group)
			}
		)		
	})

})