import React from 'react'
import PropTypes from 'prop-types'

import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'

import { loginUser, setPassword, setEmail } from '../../store/reducers/user'

import Colors from '../../constants/Colors'
import TextInput from '../UI/TextInput'
import Paragraph from '../common/Paragraph'

const LoginForm = props => {

	const { email, password, loginUser, setEmail, setPassword, error, navigation } = props

	const submitHandler = () => {
		loginUser({email, password})
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
					/>
				</View>
				<View style={styles.forgotPassword}>
					<TouchableOpacity
						onPress={() => console.log('pressed')}
					>
						<Text style={styles.label}>Forgot your password?</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.formControl}>
					<Button 
						mode="contained" 
						onPress={submitHandler} 
						color={Colors.accent}
					>
                        Login
					</Button>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Don’t have an account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Register')}>
						<Text style={styles.link}>Sign up</Text>
					</TouchableOpacity>
				</View>
                
			</View>
		</ScrollView>
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
		marginTop: 16,
	},
	label: {
		color: Colors.coffee,
	},
	link: {
		fontWeight: 'bold',
		color: Colors.accent,
	},
	errorNotice: {
		color: Colors.error
	}
})

LoginForm.propTypes = {
	user: PropTypes.object,
	email: PropTypes.string,
	password: PropTypes.string,
	fetching: PropTypes.bool,
	error: PropTypes.string,
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
		error: state.user.error,
		loginFail: state.user.loginFail,
		email: state.user.email,
		password: state.user.password
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