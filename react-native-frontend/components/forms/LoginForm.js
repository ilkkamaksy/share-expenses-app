import React from 'react'
import PropTypes from 'prop-types'

import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'

import { loginUser, setPassword, setEmail } from '../../store/reducers/user'

const LoginForm = props => {

	const { email, password, loginUser, setEmail, setPassword, error } = props

	const submitHandler = () => {
		loginUser({email, password})
	}

	return (
		<ScrollView>

			<View>
				<Text>{error}</Text>
			</View>
			
			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Email"
						label="Email" 
						style={styles.input} 
						value={email}
						onChangeText={text => setEmail(text)}
					/>
				</View>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Password"
						label="Password" 
						secureTextEntry={true}
						style={styles.input} 
						value={password}
						onChangeText={text => setPassword(text)}
					/>
				</View>
				<View style={styles.formControl}>
					<Button mode="contained" onPress={submitHandler}>
                        Login
					</Button>
				</View>
                
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({

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
	setPassword: PropTypes.func
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