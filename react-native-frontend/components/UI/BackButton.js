/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const BackButton = ({ goBack }) => (
	<TouchableOpacity onPress={goBack} style={styles.container}>
		<Image style={styles.image} source={require('../../assets/arrow_back.png')} />
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 10,
		left: 10,
	},
	image: {
		width: 24,
		height: 24,
	},
})


BackButton.propTypes = {
	goBack: PropTypes.func
}

export default BackButton