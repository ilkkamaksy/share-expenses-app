import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import { registerUser } from '../../store/reducers/user'

const RegisterScreen = props => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submitHandler = () => {
		props.registerUser({email, password})
	}

	return (
		<ScrollView>
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
						style={styles.input} 
						value={password}
						onChangeText={text => setPassword(text)}
					/>
				</View>
				<View style={styles.formControl}>
					<Button mode="contained" onPress={submitHandler}>
                        Sign up!
					</Button>
				</View>
                
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		fetching: state.user.fetching,
		error: state.user.error
	}
}

const connectedRegisterScreen = connect(
	mapStateToProps,
	{
		registerUser
	}
)(RegisterScreen)

export default connectedRegisterScreen