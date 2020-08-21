import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import Colors from '../../constants/Colors'

const DecimalInput = ({ errorText, initialValue, onChange, ...props }) => {
	
	const [value, setValue] = useState('')

	useEffect(() => {
		setValue(initialValue ? initialValue.toString() : '')
	}, [])

	
	const validate = (value) => {
		// allow only digits, one comma (,) and 2 digits after comma
		var rgx = /^\d+(.\d{0,2})?$/
		return rgx.test(value)
	}

	const onChangeValue = (value) => {

		let val = value.nativeEvent.text

		if (val.length === 0) {
			setValue('')
			return
		}

		if (!validate(val)) {
			return
		}

		// replace leading zeros with one 0 and delete the first 0, if following value is a digit
		val = val.replace(/^0*/g,'0').replace(/^0*(\d)/g, '$1') 
		
		setValue(val)
		
	}

	
	const callBackOnBlur = () => {
		onChange(parseFloat(value))
	}
	
	return (
		<View style={styles.container}>
			<Input
				style={styles.input}
				selectionColor={Colors.primary}
				initialValue={initialValue}
				value={value}
				onBlur={callBackOnBlur}
				onChange={text => onChangeValue(text)}
				keyboardType={'decimal-pad'}
				{...props}
			/>
			{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
		</View>
	)
} 

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 12,
	},
	input: {
		backgroundColor: Colors.white,
	},
	error: {
		fontSize: 14,
		color: Colors.error,
		paddingHorizontal: 4,
		paddingTop: 4,
	},
})


DecimalInput.propTypes = {
	errorText: PropTypes.string,
	initialValue: PropTypes.number,
	onChange: PropTypes.func
}

export default DecimalInput