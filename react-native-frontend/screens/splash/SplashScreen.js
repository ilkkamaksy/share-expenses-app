import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'

const SplashScreen = props => {

	console.log(props)

	const registerButtonHandler = () => {
		props.navigation.navigate('Register', {})
	}
    
	const loginButtonHandler = () => {
		props.navigation.navigate('Login', {})
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<Button mode="contained" onPress={loginButtonHandler}>
                    Login
				</Button>
				<Button mode="outlined" onPress={registerButtonHandler}>
                    Register
				</Button>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 10
	}
})

const mapStateToProps = (state) => {
	return {
		user: state.user.user
	}
}

const connectedSplashScreen = connect(
	mapStateToProps, {}
)(SplashScreen)

export default connectedSplashScreen