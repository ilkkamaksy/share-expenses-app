import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { useNavigation  } from '@react-navigation/native'
import { Button, Checkbox } from 'react-native-paper'

import { 
	setExpenseDate, 
	setExpenseToEdit, 
	addExpense,
	updateExpense 
} from '../../store/actions/expenses'

import Heading from '../UI/Heading'
import Paragraph from '../UI/Paragraph'
import Colors from '../../constants/Colors'
import TextInput from '../UI/TextInput'
import DecimalInput from '../UI/DecimalInput'
import TimePicker from '../UI/TimePicker'
import ExpensePersonShare from './ExpensePersonShare'

const EditExpense = ({ 
	error,
	expenseToEdit,
	setExpenseDate,
	setExpenseToEdit,
	addExpense,
	updateExpense,
	groupToEdit
}) => {
   
	const navigation = useNavigation()

	const [creditors, setCreditors] = useState([])
	const [showTimePicker, setShowTimePicker] = useState(false)

	useEffect(() =>{
		if (!expenseToEdit.dateTime) {
			setExpenseDate(new Date(Date.now()))
		}
		if (expenseToEdit.id) {
			const detailsWithPaidAmount = expenseToEdit.details.filter(detail => detail.paid > 0)
			const existingCreditors = detailsWithPaidAmount.map(detail => {
				return expenseToEdit.people.find(person => person.id === detail.person)
			})
			setCreditors(existingCreditors)
		}
	}, [])

	const onChangeTime = (selectedTime) => {
		const currentTime = selectedTime || expenseToEdit.dateTime
		setShowTimePicker(false)
		setExpenseDate(currentTime)
	}

	const showTimepicker = () => {
		setShowTimePicker(true)
	}

	const onChangeDescription = (text) => {
		setExpenseToEdit({
			...expenseToEdit,
			description: text.nativeEvent.text
		})
	}

	const setAmountNumeric = (amount) => {
		return !amount || amount.length === 0 ? 0 : parseFloat(amount) / 100
	}

	const onChangeAmount = (value) => {

		let newExpenseToEdit = {
			...expenseToEdit,
			amount: value * 100,
		}

		newExpenseToEdit = calculateEqualShares(newExpenseToEdit)
		setExpenseToEdit(newExpenseToEdit)
	}

	const togglePerson = (person) => {

		if (expenseToEdit.people.includes(person) && creditors.includes(person)) {
			toggleCreditor(person)
		}
 
		let newExpenseToEdit = {
			...expenseToEdit,
			people: expenseToEdit.people.includes(person) 
				? expenseToEdit.people.filter(p => p.id !== person.id)
				: expenseToEdit.people.concat(person)
			,
			details: expenseToEdit.people.includes(person) 
				? expenseToEdit.details.filter(item => item.person !== person.id)
				: expenseToEdit.details.concat({
					person: person.id,
					share: 0,
					paid: 0,
					balance: 0
				}) 
		}

		newExpenseToEdit = calculateEqualShares(newExpenseToEdit)

		setExpenseToEdit(newExpenseToEdit)
	}

	const calculateEqualShares = (expenseToEdit) => {
		return {
			...expenseToEdit,
			details: expenseToEdit.details.map(detail => {
				return {
					...detail,
					share: expenseToEdit.amount / expenseToEdit.people.length,
					balance: -1 * (expenseToEdit.amount / expenseToEdit.people.length)
				}
			})
		}
	}

	const toggleCreditor = (person) => {
		let newCreditors
		if (creditors.includes(person)) {
			newCreditors = creditors.filter(p => p.id !== person.id)
			resetPersonPaidAmount(expenseToEdit.details.find(detail => detail.person === person.id))
		} else {
			newCreditors = creditors.concat(person)
		}
		
		setCreditors(newCreditors)
	}

	const resetPersonPaidAmount = (data) => {
		if (data.paid > 0) {
			setExpenseToEdit({
				...expenseToEdit,
				details: expenseToEdit.details.map(detail => detail.person === data.person ? {
					...detail,
					paid: 0,
					balance: -1 * detail.share
				} : detail)
			})
		}
	}

	const setPersonPaidAmount = (data) => {
		setExpenseToEdit({
			...expenseToEdit,
			details: expenseToEdit.details.map(item => item.person === data.person.id 
				? {
					...item,
					paid: data.value * 100,
					balance: data.value * 100 - item.share
				}
				: item)
		})
	}

	const validate = () => {

		if (
			expenseToEdit.description.length === 0 ||
			expenseToEdit.amount === 0 ||
			expenseToEdit.people.length === 0 ||
			expenseToEdit.details.length === 0
		) {
			return true
		}

		let hasAtLeastOneCreditor = false
		
		expenseToEdit.details.forEach(detail => {
			if (detail.paid > 0) {
				hasAtLeastOneCreditor = true
			}
		})

		if (!hasAtLeastOneCreditor) {
			return true
		}

		return false
	}

	const onSaveExpense = () => {
		if (expenseToEdit.id) {
			updateExpense(expenseToEdit)
		} else {
			addExpense(expenseToEdit)
		}
		navigation.navigate('GroupItem', { group: groupToEdit })
	}

	return (
		<ScrollView>

			{error.length > 0 && 
			<Paragraph style={[{ color: Colors.error }]}>
				{error}
			</Paragraph>
			}
			
			<Heading style={[{ 
				textAlign: 'left', 
				fontSize: 12, 
				color: Colors.primary, 
				textTransform: 'uppercase', 
				paddingBottom: 5 
			}]}>
				Expense details
			</Heading>

			<View style={styles.section}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Description"
						label="Description" 
						mode="outlined"
						style={styles.input} 
						value={expenseToEdit.description}
						onChange={value => onChangeDescription(value)}
					/>
				</View>

				<View style={styles.formControl}>
					<DecimalInput
						accessibilityLabel="Total amount"
						label="Total amount" 
						mode="outlined"
						style={styles.input} 
						initialValue={setAmountNumeric(expenseToEdit.amount)}
						onChange={text => onChangeAmount(text)}
					/>
				</View>

				<View style={[styles.formControl, { marginTop: 20, marginBottom: 20, borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth }]}>
					
					<Heading style={[{ 
						textAlign: 'left', 
						fontSize: 12, 
						color: Colors.primary, 
						textTransform: 'uppercase', 
						paddingBottom: 5 
					}]}>
						When was this?
					</Heading>

					<View style={[styles.row, { marginBottom: 20 }]}>
						<View style={[styles.column, { width: '70%'}]}>
							<Text style={{ color: Colors.lightCoffee, fontSize: 13 }}>{`${expenseToEdit.dateTime.toLocaleDateString()}, at ${expenseToEdit.dateTime.toLocaleTimeString()}`}</Text>
						</View>
						<View style={[styles.column], { width: '30%' }}>
							<Button 
								style={styles.column} 
								compact={true} 
								mode="text" 
								uppercase={false} 
								onPress={showTimepicker}
								labelStyle={{ color: Colors.primary, fontSize: 12 }}
							>
								Change
							</Button> 
						</View>
					</View>
					
					{showTimePicker && (
						<TimePicker
							testID="dateTimePicker"
							initialValue={expenseToEdit.dateTime}
							onChange={onChangeTime}
							visibility={showTimePicker}
						/>
					)}
				</View>

				<View style={[styles.section, { marginBottom: 20, paddingBottom: 20, borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth }]}>
					
					<Heading style={[{ 
						textAlign: 'left', 
						fontSize: 12, 
						color: Colors.primary, 
						textTransform: 'uppercase', 
						paddingBottom: 5 
					}]}>
						Who were in?
					</Heading>

					{groupToEdit.people.map(person => {
						return (
							<View key={`${person.id}-share-toggle`} style={styles.formControl}>
								<Checkbox.Item 
									label={<Text style={{ color: Colors.coffee, fontSize: 14 }}>{person.name}</Text>} 
									status={expenseToEdit.people.includes(person) ? 'checked' : 'unchecked'}
									onPress={() => {
										togglePerson(person)
									}}
									style={{ paddingLeft: 0 }}
									color={Colors.primary}
								/>
							</View>
						)
					})}

					
				</View>

				<View style={styles.section}>
					<Heading style={[{ 
						textAlign: 'left', 
						fontSize: 12, 
						color: Colors.primary, 
						textTransform: 'uppercase', 
						paddingBottom: 5 
					}]}>
						Costs per person
					</Heading>
			
					{expenseToEdit.amount === 0 || !expenseToEdit.amount ?
						<Text style={{ fontSize: 13, color: Colors.lightCoffee, marginTop: 10 }}>Set the total amount to enable.</Text>
						:
						expenseToEdit.people.map(person => {
							return (
								<ExpensePersonShare 
									key={`${person.id}-share-input`} 
									person={person}
									setAmountNumeric={setAmountNumeric}
								/>
						
							)
						})
					}
					
				</View>
				
				{expenseToEdit.people.length > 0 &&
				<View style={[styles.section, { marginTop: 30, marginBottom: 10, paddingBottom: 10, borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth }]}>
					
					<Heading style={[{ 
						textAlign: 'left', 
						fontSize: 12, 
						color: Colors.primary, 
						textTransform: 'uppercase', 
						paddingBottom: 5 
					}]}>
						Who paid?
					</Heading>
					{expenseToEdit.amount === 0 || !expenseToEdit.amount ?
						<Text style={{ fontSize: 13, color: Colors.lightCoffee, marginTop: 10 }}>Set the total amount to enable.</Text>
						:
						expenseToEdit.people.map(person => {
							return (
								<View key={`${person.id}-creditor-toggle`} style={styles.formControl}>
									<Checkbox.Item 
										label={<Text style={{ color: Colors.coffee, fontSize: 14 }}>{person.name}</Text>} 
										status={creditors.includes(person) ? 'checked' : 'unchecked'}
										onPress={() => {
											toggleCreditor(person)
										}}
										style={{ paddingLeft: 0 }}
										color={Colors.primary}
									/>
								</View>
							)
						})
					}
					
				</View>
				}

				{expenseToEdit.amount === 0 || !expenseToEdit.amount ?
					<></>
					:
					<View style={styles.section, { marginBottom: 30 }}>
						{creditors.map(person => {
							return (
								<View key={`${person.id}-creditor`} style={styles.formControl}>

									<Text style={{ fontWeight: '700', fontSize: 12, marginTop: 15 }}>{`Amount ${person.name} paid`}</Text>
									<DecimalInput
										label="Amount" 
										accessibilityLabel="Amount paid"
										mode="outlined"
										style={styles.input} 
										initialValue={setAmountNumeric(expenseToEdit.details.find(item => item.person === person.id).paid)} 
										type="text"
										onChange={value => setPersonPaidAmount({
											person,
											value
										})}
									/>
								
								</View>
							)
						})}
					</View>
				}
				
				<View style={styles.formControl}>
					<Button 
						disabled={validate()} 
						mode="contained" 
						color={Colors.primary}
						labelStyle={{ color: Colors.white }}
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
	addExpense: PropTypes.func,
	updateExpense: PropTypes.func
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
		addExpense,
		updateExpense
	}
)(EditExpense)

export default ConnectedEditExpense