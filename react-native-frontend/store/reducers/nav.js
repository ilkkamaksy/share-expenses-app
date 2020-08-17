const initialState = {
	topRightMenuVisible: false,
}

const navReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'TOGGLE_TOP_RIGHT_MENU' : 
		return {
			...state,
			topRightMenuVisible: action.visibility
		}
	default: return state
	}
}

export default navReducer