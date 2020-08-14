import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { useNavigation  } from '@react-navigation/native'
import { Button, Checkbox } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

import { 
	setExpenseDate, 
	setExpenseToEdit, 
	addExpense } from '../../store/actions/groups'

import Heading from '../UI/Heading'
import Colors from '../../constants/Colors'
import TextInput from '../UI/TextInput'
import DecimalInput from '../UI/DecimalInput'

const EditExpense = ({ 
	error,
	expenseToEdit,
	setExpenseDate,
	setExpenseToEdit,
	addExpense,
	groupToEdit
}) => {
   
	const navigation = useNavigation()

	useEffect(() =>{
		setExpenseDate(new Date(Date.now()))
	}, [])

	const onSaveExpense = () => {
		addExpense(expenseToEdit)
		navigation.navigate('GroupItem', { group: groupToEdit })
	}

	const onChangeDescription = (text) => {
		setExpenseToEdit({
			...expenseToEdit,
			description: text.nativeEvent.text
		})
	}

	const convertCurrencyValueToText = (value) => {
		return value 
			? Number(value / 100).toFixed(2).toString().replace('.', ',') 
			: Number(0).toFixed(2).replace('.', ',') 
	}

	const onChangeAmount = (value) => {
		let val = value.nativeEvent.text.toString()

		setExpenseToEdit({
			...expenseToEdit,
			amount: parseFloat(val.replace(',', ''))
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
				? expenseToEdit.details.filter(item => item.personId !== person.id)
				: expenseToEdit.details.concat({
					personId: person.id,
					share: 0,
					paid: 0,
					balance: 0
				}) 
		})
	}

	const setPersonShare = (data) => {
		setExpenseToEdit({
			...expenseToEdit,
			details: expenseToEdit.details.map(item => item.personId === data.person.id 
				? {
					...item,
					share: parseFloat(data.value.nativeEvent.text) * 100,
					balance: item.paid - parseFloat(data.value.nativeEvent.text) * 100
				}
				: item)
		})
	}

	const setPersonPaid = (data) => {
		setExpenseToEdit({
			...expenseToEdit,
			details: expenseToEdit.details.map(item => item.personId === data.person.id 
				? {
					...item,
					paid: parseFloat(data.value.nativeEvent.text) * 100,
					balance: parseFloat(data.value.nativeEvent.text) * 100 - item.share
				}
				: item)
		})
	}

	const [showDatePicker, setShowDatePicker] = useState(false)
	const [showTimePicker, setShowTimePicker] = useState(false)

	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate || expenseToEdit.date
		setShowDatePicker(false)
		setExpenseDate(currentDate)
		setShowTimePicker(true)
	}

	const onChangeTime = (event, selectedTime) => {
		const currentTime = selectedTime || expenseToEdit.date
		setShowTimePicker(false)
		setExpenseDate(currentTime)
	}

	const showDatepicker = () => {
		setShowDatePicker(true)
	}

	return (
		<ScrollView>

			<View>
				<Text>{error}</Text>
			</View>
			
			<Heading style={[{ textAlign: 'left', fontSize: 12, color: Colors.secondary, textTransform: 'uppercase', paddingBottom: 5 }]}>
				Expense details
			</Heading>

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
					<DecimalInput
						label="Total amount" 
						style={styles.input} 
						value={convertCurrencyValueToText(expenseToEdit.amount)}
						placeholder="0.00" 
						type="text"
						onChange={text => onChangeAmount(text)}
					/>
				</View>
				
				<View style={styles.section}>
					<Heading style={[{ textAlign: 'left', fontSize: 12, color: Colors.secondary, textTransform: 'uppercase', paddingBottom: 5 }]}>
						Who were in?
					</Heading>
					{groupToEdit.people.map(person => {
						return (
							<View key={person.id} style={styles.formControl}>
								<Checkbox.Item 
									label={person.name} 
									status={expenseToEdit.people.includes(person) ? 'checked' : 'unchecked'}
									onPress={() => {
										togglePerson(person)
									}}
									style={{ paddingLeft: 0 }}
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
									<DecimalInput
										label="Share" 
										style={styles.input} 
										// value={person.name}
										placeholder="0.00" 
										type="text"
										onChange={value => setPersonShare({
											person,
											value
										})}
									/>
								</View>

								<View key={person.id} style={styles.formControl}>
									<Text>{`${person.name} paid`}</Text>
									<DecimalInput
										label="Paid" 
										style={styles.input} 
										// value={person.name}
										placeholder="0.00" 
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
					<Heading style={[{ textAlign: 'left', fontSize: 12, color: Colors.secondary, textTransform: 'uppercase', paddingBottom: 5 }]}>
						When was this?
					</Heading>
					<View style={styles.row}>
						<View style={[styles.column, { width: '70%'}]}>
							<Text>{`${expenseToEdit.date.toLocaleDateString()}, at ${expenseToEdit.date.toLocaleTimeString()}`}</Text>
						</View>
						<View style={[styles.column], { width: '30%' }}>
							<Button 
								style={styles.column} 
								compact={true} 
								mode="text" 
								uppercase={false} 
								onPress={showDatepicker}
								labelStyle={{ color: Colors.primary, fontSize: 12 }}
							>
								Change
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
						color={Colors.primary}
						onPress={onSaveExpense}
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
	column: {
		flex: 1
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
	setExpenseDate: PropTypes.func,
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
		setExpenseDate,
		addExpense
	}
)(EditExpense)

export default ConnectedEditExpense