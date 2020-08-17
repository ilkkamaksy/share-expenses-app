import '../reducers/nav'

export const toggleTopRightMenu = visibility => {
	return dispatch => {
		dispatch({
			type: 'TOGGLE_TOP_RIGHT_MENU',
			visibility
		})
	}
}
