import reducer from './groups'
import * as actions from '../actions/groups'

describe('test group reducer', () => {

	let initialState
    
	beforeEach(() => {
		initialState = {
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
			getGroupsFail: false,
			groupTotals: [],
			groupBalanceData: [],
			ownedInvitations: [],
			receivedInvitation: null
		}
		
	})

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	})

	it('should handle TOGGLE_TOP_RIGHT_MENU', () => {

		const visibility = true

		expect(
			reducer([], {
				type: 'TOGGLE_TOP_RIGHT_MENU',
				visibility
			})
		).toEqual(
			{
				topRightMenuVisible: visibility,
			}
		)		
	})

	it('should handle SET_GROUP_TO_EDIT', () => {

		const group = {
			title: 'g1 title',
			location: 'l1',
			people: ['p1'],
			users: ['u1'],
			expenses: [],
			id: 'g1',
			lastUpdatedAt: null,
			createdAt: null,
			
		}

		expect(
			reducer([], {
				type: 'SET_GROUP_TO_EDIT',
				group
			})
		).toEqual(
			{
				groupToEdit: group,
				expenseToEdit: {
					groupid: group.id 
				}
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

		const group = {
			title: 'group title',
			location: 'l1',
			people: ['p1'],
			users: ['u1'],
			id: 'g1'
		}

		initialState = {
			...initialState,
			userGroups: [...initialState.userGroups, group]
		}
		
		const removedGroupId = 'g1'

		expect(
			reducer(initialState, {
				type: 'REMOVE_GROUP_SUCCESS',
				removedGroupId
			})
		).toEqual(
			{
				...initialState,
				userGroups: []
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

		let group = {
			title: 'original group title',
			location: 'new location',
			people: ['p1'],
			users: ['u1'],
			id: 'g1'
		}

		initialState = {
			...initialState,
			userGroups: [...initialState.userGroups, group]
		}

		group = {
			...group,
			title: 'new group title',
		}
		
		expect(
			reducer(initialState, {
				type: 'UPDATE_GROUP_SUCCESS',
				group
			})
		).toEqual(
			{
				...initialState,
				userGroups: [
					{
						title: 'new group title',
						location: 'new location',
						people: ['p1'],
						users: ['u1'],
						id: 'g1'
					}			
				],
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

		initialState = {
			...initialState,
			groupToEdit: {
				...initialState.groupToEdit,
				people: [...initialState.groupToEdit.people, person]
			}
		}

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

		initialState = {
			...initialState,
			userGroups: [...initialState.userGroups, group],
			groupToEdit: group
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

	it('should handle INIT_CREATE_EXPENSE', () => {

		expect(
			reducer(initialState, {
				type: 'INIT_CREATE_EXPENSE'
			})
		).toEqual(
			{
				...initialState,
				fetching: true,
				saveGroupFail: false,
				error: ''
			}
		)		
	})

	it('should handle SET_EXPENSE_TO_EDIT', () => {

		const expense = {
			id: 'e1',
			groupid: 'g1',
			date: null,
			lastUpdatedAt: null,
			createdAt: null,
			description: 'desc',
			amount: Number(0).toFixed(2),
			people: ['p1', 'p2'],
			details: []
		}
		
		expect(
			reducer(initialState, {
				type: 'SET_EXPENSE_TO_EDIT',
				expense
			})
		).toEqual(
			{
				...initialState,
				expenseToEdit: expense,
			}
		)		
	})

	it('should handle SET_EXPENSE_DATE', () => {

		const date = new Date(Date.now())
		
		expect(
			reducer(initialState, {
				type: 'SET_EXPENSE_DATE',
				date
			})
		).toEqual(
			{
				...initialState,
				expenseToEdit: {
					...initialState.expenseToEdit,
					date
				},
			}
		)		
	})

	it('should handle CREATE_EXPENSE_SUCCESS', () => {

		const expense = {
			id: 'e1',
			groupid: 'g1',
			date: null,
			lastUpdatedAt: null,
			createdAt: null,
			description: 'desc',
			amount: Number(0).toFixed(2),
			people: ['p1', 'p2'],
			details: []
		}

		let modifiedGroup = {
			title: 'group title',
			location: 'new location',
			people: ['p1', 'p2', 'p3'],
			users: ['u1', 'u2'],
			id: 'g1',
			expenses: []
		}

		initialState = {
			...initialState,
			groupToEdit: modifiedGroup,
			userGroups: [modifiedGroup]
		}

		modifiedGroup = {
			...modifiedGroup,
			expenses: [expense]
		}

		expect(
			reducer(initialState, {
				type: 'CREATE_EXPENSE_SUCCESS',
				group: modifiedGroup
			})
		).toEqual(
			{
				...initialState,
				saveGroupFail: false,
				error: '',
				fetching: false,
				userGroups: initialState.userGroups.map(group => group.id === modifiedGroup.id ? modifiedGroup : group),
				groupToEdit: modifiedGroup
			}
		)		
	})

	it('should handle CREATE_EXPENSE_FAIL', () => {

		const response = 'error'

		expect(
			reducer(initialState, {
				type: 'CREATE_EXPENSE_FAIL',
				response
			})
		).toEqual(
			{
				...initialState,
				saveGroupFail: true,
				error: response,
				fetching: false
			}
		)		
	})

	it('should handle INIT_REMOVE_EXPENSE', () => {

		expect(
			reducer(initialState, {
				type: 'INIT_REMOVE_EXPENSE',
			})
		).toEqual(
			{
				...initialState,
				error: ''
			}
		)		
	})
})