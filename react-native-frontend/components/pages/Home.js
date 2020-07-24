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
		<Background>
			<Logo />
			<Heading>Welcome to ShareExpenses</Heading>
			<Paragraph>
				An easy way to track shared expenses with your friends and family.
			</Paragraph>
			<View style={styles.container}>
				<Button 
					mode="contained"
					style={[
						styles.button,
						{color: Colors.white}
					]}
					onPress={loginButtonHandler} 
					color={Colors.primary}
				>
                    Login
				</Button>
				<Button
					mode="outlined"
					style={styles.button}
					onPress={registerButtonHandler} 
					color={Colors.primary}
				>
                    Register
				</Button>
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	button: {
		width: '100%',
		marginVertical: 10,
	},
	
	forgotPassword: {
		width: '100%',
		alignItems: 'flex-end',
		marginBottom: 24,
	},
	row: {
		flexDirection: 'row',
		marginTop: 4,
	},
	label: {
		color: Colors.primary,
	},
	link: {
		fontWeight: 'bold',
		color: Colors.primary,
	},
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