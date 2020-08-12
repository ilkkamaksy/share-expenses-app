import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'

import Logo from '../UI/Logo'
import Background from '../UI/Background'
import Paragraph from '../UI/Paragraph'
import Heading from '../UI/Heading'
import Colors from '../../constants/Colors'

const Home = props => {

	const registerButtonHandler = () => {
		props.navigation.navigate('Register', {})
	}
    
	const loginButtonHandler = () => {
		props.navigation.navigate('Login', {})
	}

	return (
		<View>

			<Heading style={[{ color: Colors.primary }]}>Hey there!</Heading>
			<Paragraph style={[{ color: Colors.lightCoffee, fontSize: 14.5 }]}>
					ShareExpenses is an easy way to track shared expenses with your friends and family. Step right in to get started!
			</Paragraph>
			<View style={styles.centered}>
				<Button 
					mode="contained"
					style={[
						styles.button,
					]}
					labelStyle={{color: Colors.white}}
					onPress={loginButtonHandler} 
					color={Colors.primary}
				>
                    Login
				</Button>
				<Button
					mode="outlined"
					style={styles.button}
					onPress={registerButtonHandler} 
					color={Colors.white}
					labelStyle={{color: Colors.primary}}
				>
                    Register
				</Button>
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		width: 140,
		marginVertical: 5,
	},
	centered: {
		alignItems: 'center'
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