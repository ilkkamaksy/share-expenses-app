import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'

const Home = props => {

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

Home.propTypes = {
	user: PropTypes.object,
	navigation: PropTypes.object
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user
	}
}

const connectedHome = connect(mapStateToProps, {})(Home)

export default connectedHome