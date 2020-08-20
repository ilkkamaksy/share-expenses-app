import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { useNavigation  } from '@react-navigation/native'
import { Button, Checkbox } from 'react-native-paper'

import { 
	setExpenseDate, 
	setExpenseToEdit, 
	addExpense 
} from '../../store/actions/expenses'

import Heading from '../UI/Heading'
import Paragraph from '../UI/Paragraph'
import Colors from '../../constants/Colors'
import TextInput from '../UI/TextInput'
import DecimalInput from '../UI/DecimalInput'
import TimePicker from '../UI/TimePicker'
import ExpensePeopleShares from './ExpensePeopleShares'

const EditExpense = ({ 
	error,
	expenseToEdit,
	setExpenseDate,
	setExpenseToEdit,
	addExpense,
	groupToEdit
}) => {
   
	const navigation = useNavigation()

	const [creditors, setCreditors] = useState([])
	const [showTimePicker, setShowTimePicker] = useState(false)

	useEffect(() =>{
		if (!expenseToEdit.date) {
			setExpenseDate(new Date(Date.now()))
		}
	}, [])

	const onChangeTime = (selectedTime) => {
		const currentTime = selectedTime || expenseToEdit.date
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

	const setInitialAmount = (amount) => {
		return amount ? Number(amount / 100).toFixed(2) : amount
	}

	const onChangeAmount = (value) => {
		setExpenseToEdit({
			...expenseToEdit,
			amount: value * 100,
			details: expenseToEdit.details.map(detail => {
				return {
					...detail,
					share: value * 100 / expenseToEdit.people.length,
					balance: -1 * (value * 100 / expenseToEdit.people.length)
				}
			})
		})
	}

	const addPersonToExpense = (person) => {
 
		let newExpenseToEdit = {
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
		}

		setExpenseToEdit(newExpenseToEdit)
	}

	const addCreditorToExpense = (person) => {
		setCreditors(creditors.includes(person) ? creditors.filter(p => p.id !== person.id) : creditors.concat(person))
	}

	const setPersonPaid = (data) => {
		setExpenseToEdit({
			...expenseToEdit,
			details: expenseToEdit.details.map(item => item.personId === data.person.id 
				? {
					...item,
					paid: data.value * 100,
					balance: data.value * 100 - item.share
				}
				: item)
		})
	}

	const onSaveExpense = () => {
		addExpense(expenseToEdit)
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
						initialValue={setInitialAmount(expenseToEdit.amount)}
						placeholder="" 
						onChange={text => onChangeAmount(text)}
					/>
				</View>

				<View style={[styles.formControl, { marginTop: 20 }]}>
					
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
							<Text style={{ color: Colors.lightCoffee, fontSize: 13 }}>{`${expenseToEdit.date.toLocaleDateString()}, at ${expenseToEdit.date.toLocaleTimeString()}`}</Text>
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
							initialValue={expenseToEdit.date}
							onChange={onChangeTime}
							visibility={showTimePicker}
						/>
					)}
				</View>

				<View style={[styles.section, { marginVertical: 30, backgroundColor: '#f7f7f7', padding: 20, borderRadius: 8 }]}>
					
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
									label={<Text style={{ color: Colors.coffee }}>{person.name}</Text>} 
									status={expenseToEdit.people.includes(person) ? 'checked' : 'unchecked'}
									onPress={() => {
										addPersonToExpense(person)
									}}
									style={{ paddingLeft: 0 }}
									color={Colors.primary}
								/>
							</View>
						)
					})}

					
				</View>

				<ExpensePeopleShares />

				{expenseToEdit.people.length > 0 &&
				<View style={[styles.section, { marginVertical: 30, backgroundColor: '#f7f7f7', padding: 20, borderRadius: 8 }]}>
					
					<Heading style={[{ 
						textAlign: 'left', 
						fontSize: 12, 
						color: Colors.primary, 
						textTransform: 'uppercase', 
						paddingBottom: 5 
					}]}>
					Who paid?
					</Heading>
					{expenseToEdit.people.map(person => {
						return (
							<View key={`${person.id}-creditor-toggle`} style={styles.formControl}>
								<Checkbox.Item 
									label={<Text style={{ color: Colors.coffee }}>{person.name}</Text>} 
									status={creditors.includes(person) ? 'checked' : 'unchecked'}
									onPress={() => {
										addCreditorToExpense(person)
									}}
									style={{ paddingLeft: 0 }}
									color={Colors.primary}
								/>
							</View>
						)
					})}
				</View>
				}

				<View style={styles.section}>
					{creditors.map(person => {
						return (
							<View key={`${person.id}-creditor`} style={styles.formControl}>

								<Text style={{ fontWeight: '700', fontSize: 12, marginTop: 15 }}>{`${person.name} paid`}</Text>
								<DecimalInput
									label="Paid" 
									accessibilityLabel="Paid"
									mode="outlined"
									style={styles.input} 
									initialValue={setInitialAmount(expenseToEdit.details.find(item => item.personId === person.id).paid)} 
									type="text"
									onChange={value => setPersonPaid({
										person,
										value
									})}
								/>
								
							</View>
						)
					})}
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