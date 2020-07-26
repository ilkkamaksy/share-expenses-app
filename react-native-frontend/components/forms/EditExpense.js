import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'
import { connect } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'

import { setDate, setExpenseToEdit, addExpense } from '../../store/reducers/groups'
import TextInput from '../UI/TextInput'
import CurrencyInput from '../UI/CurrencyInput'

const EditExpense = ({ 
	error,
	expenseToEdit,
	setDate,
	setExpenseToEdit,
	addExpense,
	groupToEdit,
	navigation
}) => {
   
	useEffect(() =>{
		setDate(new Date(Date.now()))
	}, [])

	const onChangeDescription = (data) => {
		setExpenseToEdit({
			...expenseToEdit,
			description: data.target.value
		})
	}

	const convertCurrencyValueToText = (value) => {
		return value > 0 ? Number(value / 100).toFixed(2).toString().replace('.', ',') : ''
	}

	const onChangeAmount = (data) => {
		setExpenseToEdit({
			...expenseToEdit,
			amount: Number(data.target.value.toString().replace(',', '.')).toFixed(2) * 100
		})
	}

	const togglePerson = (person) => {
		setExpenseToEdit({
			...expenseToEdit,
			people: expenseToEdit.people.includes(person) 
				? expenseToEdit.people.filter(p => p.id !== person.id)
				: expenseToEdit.people.concat(person)
			,
			details: expenseToEdit.people.includes(person) 
				? expenseToEdit.details.filter(item => item.person.id !== person.id)
				: expenseToEdit.details.concat({
					person: person,
					share: 0,
					paid: 0
				}) 
		})
	}

	const setPersonShare = (data) => {
		setExpenseToEdit({
			...expenseToEdit,
			details: expenseToEdit.details.map(item => item.person.id === data.person.id 
				? {
					...item,
					share: data.value.target.value,
				}
				: item)
		})
	}

	const setPersonPaid = (data) => {
		setExpenseToEdit({
			...expenseToEdit,
			details: expenseToEdit.details.map(item => item.person.id === data.person.id 
				? {
					...item,
					paid: data.value.target.value,
				}
				: item)
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
						onChange={value => onChangeDescription(value)}
					/>
				</View>

				<View style={styles.formControl}>
					<Text>Amount</Text>
					<CurrencyInput
						label="Amount" 
						style={styles.input} 
						value={convertCurrencyValueToText(expenseToEdit.amount)}
						placeholder="0.00 €" 
						type="text"
						onChange={value => onChangeAmount(value)}
					/>
				</View>
				
				<View style={styles.section}>
					<Text>Select people</Text>
					{groupToEdit.people.map(person => {
						return (
							<View key={person.id} style={styles.formControl}>
								<Checkbox.Item 
									label={person.name} 
									status={expenseToEdit.people.includes(person) ? 'checked' : 'unchecked'}
									onPress={() => {
										togglePerson(person)
									}}
								/>
							</View>
						)
					})}
				</View>

				<View style={styles.section}>
					{expenseToEdit.people.map(person => {
						return (
							<View key={person.id} style={styles.row}>
								<View  style={styles.formControl}>
									<Text>{`${person.name}'s share`}</Text>
									<CurrencyInput
										label="Share" 
										style={styles.input} 
										// value={person.name}
										placeholder="0.00 €" 
										type="text"
										onChange={value => setPersonShare({
											person,
											value
										})}
									/>
								</View>

								<View key={person.id} style={styles.formControl}>
									<Text>{`${person.name} paid`}</Text>
									<CurrencyInput
										label="Share" 
										style={styles.input} 
										// value={person.name}
										placeholder="0.00 €" 
										type="text"
										onChange={value => setPersonPaid({
											person,
											value
										})}
									/>
								</View>
							</View>
						)
					})}
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
						onPress={() => addExpense(expenseToEdit)}
					>
                        Save
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
	expenseToEdit: PropTypes.object,
	groupToEdit: PropTypes.object,
	setExpenseToEdit: PropTypes.func,
	setDate: PropTypes.func,
	addExpense: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		fetching: state.groups.fetching,
		error: state.groups.error,
		expenseToEdit: state.groups.expenseToEdit,
		groupToEdit: state.groups.groupToEdit
	}
}

const ConnectedEditExpense = connect(
	mapStateToProps,
	{
		setExpenseToEdit,
		setDate,
		addExpense
	}
)(EditExpense)

export default ConnectedEditExpense