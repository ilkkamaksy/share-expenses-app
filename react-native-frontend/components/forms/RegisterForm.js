import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'

import { registerUser, setEmail, setPassword } from '../../store/actions/user'
import { emailValidator, passwordValidator } from '../../utils/validate'

import Colors from '../../constants/Colors'
import TextInput from '../UI/TextInput'
import Paragraph from '../UI/Paragraph'

const RegisterForm = ({ 
	email, 
	password, 
	setEmail, 
	setPassword, 
	registerUser, 
	registerError, 
	navigation 
}) => {

	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	const submitHandler = () => {
		registerUser({email, password})
	}

	const validateEmail = () => {
		setEmailError(emailValidator(email) ? '' : 'Oops! We need a valid email.')
	}

	const validatePassword = () => {
		setPasswordError(passwordValidator(password) ? '' : 'Password has to be at least 4 characters.')
	}

	const onNavigation = () => {
		setEmail('')
		setPassword('')
		navigation.navigate('Login')
	}

	return (
		<View>

			{registerError.length > 0 && 
			<Paragraph style={[{ color: Colors.error, fontSize: 13, marginBottom: 0, lineHeight: 16 }]}>
				{registerError}
			</Paragraph>
			}

			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Email"
						label="Email" 
						style={styles.input} 
						value={email}
						onChangeText={text => setEmail(text)}
						returnKeyType="next"
						onBlur={validateEmail}
						errorText={emailError}
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
						returnKeyType="done"
						accessibilityLabel="Password"
						label="Password" 
						secureTextEntry={true}
						style={styles.input} 
						value={password}
						onChangeText={text => setPassword(text)}
						onBlur={validatePassword}
						errorText={passwordError}
						underlineColor="transparent"
						mode="outlined"
					/>
				</View>
				<View style={styles.formControl}>
					<Button 
						style={styles.button}
						mode="contained" 
						onPress={submitHandler} 
						color={Colors.primary}
						labelStyle={{color: Colors.white}}
					>
                        Sign up!
					</Button>
				</View>
                
				<View style={styles.row}>
					<Text style={styles.label}>Already have an account? </Text>
					<TouchableOpacity onPress={onNavigation}>
						<Text style={styles.link}>Login</Text>
					</TouchableOpacity>
				</View>

			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	label: {
		color: Colors.coffee,
	},
	button: {
		marginTop: 16,
	},
	row: {
		flexDirection: 'row',
		marginTop: 20,
	},
	link: {
		fontWeight: 'bold',
		color: Colors.primary,
	},
})

RegisterForm.propTypes = {
	user: PropTypes.object,
	email: PropTypes.string,
	password: PropTypes.string,
	fetching: PropTypes.bool,
	registerError: PropTypes.string,
	registerFail: PropTypes.bool,
	registerUser: PropTypes.func,
	setEmail: PropTypes.func,
	setPassword: PropTypes.func,
	navigation: PropTypes.object
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		fetching: state.user.fetching,
		registerError: state.user.registerError,
		email: state.user.email,
		password: state.user.password
	}
}

const connectedRegisterForm = connect(
	mapStateToProps,
	{
		registerUser,
		setEmail,
		setPassword
	}
)(RegisterForm)

export default connectedRegisterForm