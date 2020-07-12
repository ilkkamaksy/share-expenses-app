import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'

import { registerUser, setEmail, setPassword } from '../../store/reducers/user'
import Colors from '../../constants/Colors'

const RegisterForm = props => {

	const { email, password, setEmail, setPassword, registerUser, error } = props
	
	const submitHandler = () => {
		registerUser({email, password})
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
						label="password" 
						secureTextEntry={true}
						style={styles.input} 
						value={password}
						onChangeText={text => setPassword(text)}
					/>
				</View>
				<View style={styles.formControl}>
					<Button mode="contained" onPress={submitHandler} color={Colors.primary}>
                        Sign up!
					</Button>
				</View>
                
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({

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
	setPassword: PropTypes.func
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