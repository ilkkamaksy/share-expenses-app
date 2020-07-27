import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const NoResults = () => {

	return (
		<View style={styles.container}>
			<Text style={styles.subtitle}>You don&#39;t have groups yet, go ahead and add one to get started :)</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	subtitle: {
		color: Colors.coffee,
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 16,
		paddingBottom: 10,
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: StyleSheet.hairlineWidth,
	}
})

export default NoResults