import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

const TimePicker = ({ visibility = false, initialValue, onChange, testID }) => {
   
	const [value, setValue] = useState(initialValue)
	const [showDatePicker, setShowDatePicker] = useState(visibility)
	const [showTimePicker, setShowTimePicker] = useState(false)

	console.log('visi', visibility)
	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate || value
		setShowDatePicker(false)
		
		setValue(currentDate)
		setShowTimePicker(true)
	}

	const onChangeTime = (event, selectedTime) => {
		const currentTime = selectedTime || value
		setShowTimePicker(false)
		setValue(currentTime)
		onChange(currentTime)
	}

	return (
		<View style={styles.container}>
			{showDatePicker && (
				<DateTimePicker
					testID={testID}
					value={value}
					mode="date"
					is24Hour={true}
					display="default"
					onChange={onChangeDate}
				/>
			)}
			{showTimePicker && (
				<DateTimePicker
					testID={testID}
					value={value}
					mode="time"
					is24Hour={false}
					display="default"
					onChange={onChangeTime}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {}
})

TimePicker.propTypes = {
	visibility: PropTypes.bool,
	initialValue: PropTypes.any,
	onChange: PropTypes.func,
	testID: PropTypes.string
}

export default TimePicker