import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'

import { setDate, setExpenseToEdit } from '../../store/reducers/groups'

const EditExpense = props => {

	const { error, expenseToEdit, setDate, setExpenseToEdit, navigation } = props
   
	useEffect(() =>{
		setDate(new Date(Date.now()))
	}, [])

	const onChangeDescription = (text) => {
		setExpenseToEdit({
			...expenseToEdit,
			description: text
		})
	}

	const onChangeAmount = (text) => {

		let val = text
		val = val.replace(/([^0-9.]+)/, "")
		val = val.replace(/^(0|\.)/, "")
		const match = /(\d{0,7})[^.]*((?:\.\d{0,2})?)/g.exec(val)
		const value = match[1] + match[2]
		text = value
		
		setExpenseToEdit({
			...expenseToEdit,
			amount: val.length > 0 ? Number(value).toFixed(2) : ''
		})
	}

	console.log(expenseToEdit)

	const [showDatePicker, setShowDatePicker] = useState(false)
	const [showTimePicker, setShowTimePicker] = useState(false)

	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate || expenseToEdit.date
		setShowDatePicker(false)
		setDate(currentDate)
		setShowTimePicker(true)
	}

	const onChangeTime = (event, selectedTime) => {
		const currentTime = selectedTime || expenseToEdit.date
		setShowTimePicker(false)
		setDate(currentTime)
	}

	const showDatepicker = () => {
		setShowDatePicker(true)
	}

	return (
		<ScrollView>

			<View>
				<Text>{error}</Text>
			</View>
			
			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Description"
						label="Description" 
						style={styles.input} 
						value={expenseToEdit.description}
						onChangeText={text => onChangeDescription(text)}
					/>
				</View>

				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Amount"
						label="Amount" 
						style={styles.input} 
						value={expenseToEdit.amount.toString()}
						onChangeText={text => onChangeAmount(text)}
					/>
				</View>
				
				<View style={styles.formControl}>
					<View style={styles.row}>
						<View style={styles.rowItem}>
							{/* <Text>{`When: ${groupToEdit.date.toLocaleDateString()}, at ${groupToEdit.date.toLocaleTimeString()}`}</Text> */}
						</View>
						<View style={styles.rowItem}>
							<Button style={styles.rowItem} compact={true} mode="text" uppercase={false} onPress={showDatepicker}>
								(Change)
							</Button> 
						</View>
					</View>
					
					{showDatePicker && (
						<DateTimePicker
							testID="dateTimePicker"
							value={expenseToEdit.date}
							mode="date"
							is24Hour={true}
							display="default"
							onChange={onChangeDate}
						/>
					)}
					{showTimePicker && (
						<DateTimePicker
							testID="dateTimePicker"
							value={expenseToEdit.date}
							mode="time"
							is24Hour={false}
							display="default"
							onChange={onChangeTime}
						/>
					)}
				</View>


				<View style={styles.formControl}>
					<Button 
						disabled={expenseToEdit.description.length > 0 ? false : true} 
						mode="contained" 
						onPress={() => navigation.navigate('EditGroupPeople')}
					>
                        Next
					</Button>
				</View>
                
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between'
	}, 
	rowItem: {
		flex: 0
	}
})

EditExpense.propTypes = {
	navigation: PropTypes.object,
	user: PropTypes.object,
	fetching: PropTypes.bool,
	error: PropTypes.string,
	setExpenseToEdit: PropTypes.func,
	expenseToEdit: PropTypes.object,
	setDate: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		fetching: state.groups.fetching,
		error: state.groups.error,
		expenseToEdit: state.groups.expenseToEdit
	}
}

const ConnectedEditExpense = connect(
	mapStateToProps,
	{
		setExpenseToEdit,
		setDate
	}
)(EditExpense)

export default ConnectedEditExpense