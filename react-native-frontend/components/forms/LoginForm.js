import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'

import { loginUser } from '../../store/reducers/user'

const LoginForm = props => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submitHandler = () => {
		props.loginUser({email, password})
	}

	return (
		<ScrollView>

			<View>
				<Text>{props.error}</Text>
			</View>
			
			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						label="Email" 
						style={styles.input} 
						value={email}
						onChangeText={text => setEmail(text)}
					/>
				</View>
				<View style={styles.formControl}>
					<TextInput 
						label="password" 
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
	fetching: PropTypes.bool,
	error: PropTypes.string,
	loginFail: PropTypes.bool,
	loginUser: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		fetching: state.user.fetching,
		error: state.user.error,
		loginFail: state.user.loginFail
	}
}

const connectedLoginForm = connect(
	mapStateToProps,
	{
		loginUser
	}
)(LoginForm)

export default connectedLoginForm