import React from 'react'
import PropTypes from 'prop-types'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'

import { loginUser, setPassword, setEmail } from '../../store/actions/user'

import Colors from '../../constants/Colors'
import TextInput from '../UI/TextInput'
import Paragraph from '../UI/Paragraph'

const LoginForm = ({ 
	email, 
	password, 
	loginUser, 
	setEmail, 
	setPassword, 
	loginError, 
	navigation 
}) => {

	const submitHandler = () => {
		loginUser({email, password})
	}

	const onNavigation = () => {
		setEmail('')
		setPassword('')
		navigation.navigate('Register')
	}

	return (
		<View>

			{loginError.length > 0 && 
			<Paragraph style={[{ color: Colors.error, fontSize: 13, marginBottom: 0, lineHeight: 16 }]}>
				{loginError}
			</Paragraph>
			}

			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Email"
						returnKeyType="next"
						label="Email" 
						value={email}	
						onChangeText={text => setEmail(text)}
						error={!!email.error}
						errorText=""
						autoCapitalize="none"
						autoCompleteType="email"
						textContentType="emailAddress"
						keyboardType="email-address"
						underlineColor="transparent"
						mode="outlined"
					/>
				</View>
				<View style={styles.formControl}>
					
					<TextInput 
						returnKeyType="next"
						accessibilityLabel="Password"
						label="Password" 
						autoCapitalize="none"
						secureTextEntry={true}
						value={password}
						onChangeText={text => setPassword(text)}
						error={!!password.error}
						errorText=""
						underlineColor="transparent"
						mode="outlined"
					/>
				</View>
				<View style={styles.formControl}>
					<Button 
						mode="contained" 
						onPress={submitHandler} 
						color={Colors.primary}
						labelStyle={{color: Colors.white}}
						style={styles.button}
					>
                        Login
					</Button>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Don’t have an account? </Text>
					<TouchableOpacity onPress={onNavigation}>
						<Text style={styles.link}>Sign up!</Text>
					</TouchableOpacity>
				</View>
                
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	forgotPassword: {
		width: '100%',
		alignItems: 'flex-end',
		marginBottom: 24,
	},
	row: {
		flexDirection: 'row',
		marginTop: 20,
	},
	label: {
		color: Colors.coffee,
	},
	link: {
		fontWeight: 'bold',
		color: Colors.primary,
	},
	errorNotice: {
		color: Colors.error
	},
	button: {
		marginTop: 16,
		display: 'flex'
	},
})

LoginForm.propTypes = {
	user: PropTypes.object,
	email: PropTypes.string,
	password: PropTypes.string,
	fetching: PropTypes.bool,
	loginError: PropTypes.string,
	loginFail: PropTypes.bool,
	loginUser: PropTypes.func,
	setEmail: PropTypes.func,
	setPassword: PropTypes.func,
	navigation: PropTypes.object
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		fetching: state.user.fetching,
		loginError: state.user.loginError,
		loginFail: state.user.loginFail,
		email: state.user.email,
		password: state.user.password,
	}
}

const connectedLoginForm = connect(
	mapStateToProps,
	{
		loginUser,
		setPassword,
		setEmail
	}
)(LoginForm)

export default connectedLoginForm