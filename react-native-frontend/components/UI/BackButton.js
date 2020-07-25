import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet } from 'react-native'
import ArrowLeft from '../icons/ArrowLeft'
import Colors from '../../constants/Colors'

const BackButton = ({ goBack, color =  Colors.coffee}) => (
	<TouchableOpacity onPress={goBack} style={styles.container}>
		<ArrowLeft size={20} color={color} />
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 16,
		left: 20,
	}
})


BackButton.propTypes = {
	goBack: PropTypes.func,
	color: PropTypes.string
}

export default BackButton