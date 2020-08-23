import reducer from './user'

describe('test user reducer', () => {

	let initialState
    
	beforeEach(() => {
		initialState = {
			email: '',
			name: '',
			password: '',
			userdata: null,
			fetching: true,
			initialFetchDone: false,
			loginout: false,
			error: '',
			loginFail: false,
			registerFail: false,
			updateUserFail: false
		}
	})

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	})

	it('should handle SET_EMAIL', () => {

		const email = 'a@a.a'

		expect(
			reducer(initialState, {
				type: 'SET_EMAIL',
				email
			})
		).toEqual(
			{
				...initialState,
				email
			}
		)		
	})

	it('should handle SET_PASSWORD', () => {

		const password = 'pass'

		expect(
			reducer(initialState, {
				type: 'SET_PASSWORD',
				password
			})
		).toEqual(
			{
				...initialState,
				password
			}
		)		
	})

	it('should handle INIT_REGISTER', () => {

		expect(
			reducer(initialState, {
				type: 'INIT_REGISTER'
			})
		).toEqual(
			{
				...initialState,
				fetching: true,
				registerFail: false,
				error: ''
			}
		)		
	})

	it('should handle INIT_REGISTER', () => {

		expect(
			reducer(initialState, {
				type: 'INIT_REGISTER'
			})
		).toEqual(
			{
				...initialState,
				fetching: true,
				registerFail: false,
				error: ''
			}
		)		
	})

	it('should handle REGISTER_SUCCESS', () => {

		const userdata = {
			id: 'u2',
			email: 'a@a.a'
		}

		expect(
			reducer(initialState, {
				type: 'REGISTER_SUCCESS',
				userdata
			})
		).toEqual(
			{
				...initialState,
				userdata,
				registerFail: false,
				error: '',
				fetching: false,
				password: '',
				email: ''
			}
		)		
	})

	it('should handle REGISTER_FAIL', () => {

		const error = 'fail'

		expect(
			reducer(initialState, {
				type: 'REGISTER_FAIL',
				response: error
			})
		).toEqual(
			{
				...initialState,
				registerFail: true,
				error,
				fetching: false
			}
		)		
	})

	it('should handle INIT_LOGIN', () => {

		expect(
			reducer(initialState, {
				type: 'INIT_LOGIN'
			})
		).toEqual(
			{
				...initialState,
				fetching: true,
				loginFail: false,
				error: ''
			}
		)		
	})

	it('should handle LOGIN_SUCCESS', () => {

		const userdata = {
			id: 'u2',
			email: 'a@a.a'
		}

		expect(
			reducer(initialState, {
				type: 'LOGIN_SUCCESS',
				userdata
			})
		).toEqual(
			{
				...initialState,
				userdata,
				loginFail: false,
				error: '',
				fetching: false,
				password: '',
				email: ''
			}
		)		
	})

	it('should handle LOGIN_FAIL', () => {

		const error = 'fail'

		expect(
			reducer(initialState, {
				type: 'LOGIN_FAIL',
				response: error
			})
		).toEqual(
			{
				...initialState,
				loginFail: true,
				error,
				fetching: false
			}
		)		
	})

	it('should handle CHECK_IF_ALREADY_AUTHENTICATED', () => {

		expect(
			reducer(initialState, {
				type: 'CHECK_IF_ALREADY_AUTHENTICATED'
			})
		).toEqual(
			{
				...initialState,
				fetching: true
			}
		)		
	})

	it('should handle AUTHENTICATION_CHECK_DONE', () => {

		const userdata = {
			id: 'u2',
			email: 'a@a.a'
		}

		expect(
			reducer(initialState, {
				type: 'AUTHENTICATION_CHECK_DONE',
				userdata
			})
		).toEqual(
			{
				...initialState,
				userdata,
				fetching: false
			}
		)		
	})

	it('should handle LOGGING_OUT', () => {

		expect(
			reducer(initialState, {
				type: 'LOGGING_OUT'
			})
		).toEqual(
			{
				...initialState,
				userdata: null,
				loginout: true
			}
		)		
	})

	it('should handle LOGOUT_DONE', () => {

		expect(
			reducer(initialState, {
				type: 'LOGOUT_DONE'
			})
		).toEqual(
			{
				...initialState,
				loginout: false
			}
		)		
	})
})
