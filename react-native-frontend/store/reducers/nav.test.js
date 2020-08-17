import reducer from './nav'

describe('test nav reducer', () => {

	let initialState
    
	beforeEach(() => {
		initialState = {
			topRightMenuVisible: false,
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
})