import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

const PersonListItem = props => {

	return (
		<View>
			<Text>{props.person.name}</Text>
		</View>
	)
}

PersonListItem.propTypes = {
	person: PropTypes.object
}

export default PersonListItem