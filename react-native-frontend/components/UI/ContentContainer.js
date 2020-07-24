import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
} from 'react-native'

import Colors from '../../constants/Colors'

const ContentContainer = ({ children, style }) => (
	<View
		style={[
			styles.background,
			style
		]}
	>
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			{children}
		</KeyboardAvoidingView>
	</View>
)

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 20,
		paddingBottom: 20
	},
	container: {
		flex: 1,
		paddingTop: 10,
		paddingBottom: 20,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
	},
})


ContentContainer.propTypes = {
	children: PropTypes.array,
	style: PropTypes.array
}

export default ContentContainer