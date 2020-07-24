import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'

import { registerUser, setEmail, setPassword } from '../../store/reducers/user'

import Colors from '../../constants/Colors'
import TextInput from '../UI/TextInput'
import Paragraph from '../UI/Paragraph'

const RegisterForm = props => {

	const { email, password, setEmail, setPassword, registerUser, error, navigation } = props
	
	const submitHandler = () => {
		registerUser({email, password})
	}

	return (
		<ScrollView>

			<Paragraph style={{ color: Colors.error }}>
				{error}
			</Paragraph>

			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Email"
						label="Email" 
						style={styles.input} 
						value={email}
						onChangeText={text => setEmail(text)}
						returnKeyType="next"
						error={!!email.error}
						errorText=""
						autoCapitalize="none"
						autoCompleteType="email"
						textContentType="emailAddress"
						keyboardType="email-address"
					/>
				</View>
				<View style={styles.formControl}>
					<TextInput 
						returnKeyType="done"
						accessibilityLabel="Password"
						label="password" 
						secureTextEntry={true}
						style={styles.input} 
						value={password}
						onChangeText={text => setPassword(text)}
						error={!!password.error}
						errorText=""
					/>
				</View>
				<View style={styles.formControl}>
					<Button 
						style={styles.button}
						mode="contained" 
						onPress={submitHandler} 
						color={Colors.primary}
					>
                        Sign up!
					</Button>
				</View>
                
				<View style={styles.row}>
					<Text style={styles.label}>Already have an account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={styles.link}>Login</Text>
					</TouchableOpacity>
				</View>

			</View>
		</ScrollView>
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
	error: PropTypes.string,
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
		error: state.user.error,
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