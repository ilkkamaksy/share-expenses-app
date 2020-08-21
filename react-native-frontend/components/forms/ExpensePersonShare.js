import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { 
	setExpenseToEdit, 
} from '../../store/actions/expenses'

import DecimalInput from '../UI/DecimalInput'
import Colors from '../../constants/Colors'

const ExpensePersonShare = ({ 
	person,
	expenseToEdit,
	setExpenseToEdit,
	setAmountNumeric,
}) => {

	const [inputVisible, setInputVisible] = useState(false)

	const amountInCents = Number(expenseToEdit.details.find(d => d.personId === person.id).share)
	const amount = Number(expenseToEdit.details.find(d => d.personId === person.id).share / 100).toFixed(2)
	const share = amountInCents === 0 ? '0' : Number(((amount * 100) / expenseToEdit.amount) * 100).toFixed(2)

	useEffect(() => {
		setInputVisible(false)
	}, [expenseToEdit.amount, expenseToEdit.people])

	const setPersonShare = (data) => {
		setExpenseToEdit({
			...expenseToEdit,
			details: expenseToEdit.details.map(item => item.personId === data.person.id 
				? {
					...item,
					share: data.value * 100,
					balance: item.paid - data.value * 100
				}
				: item)
		})
	}

	const toggleInput = () => {
		setInputVisible(!inputVisible)
	}

	return (
		<View>
			<View style={styles.formControl}>
				<Text style={{ fontWeight: '700', fontSize: 13, marginTop: 15 }}>{`${person.name}'s costs`}</Text>
				<View style={[styles.row, { marginBottom: 0, paddingBottom: 10, borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth }]}>
					<View style={[styles.column, { width: '70%'}]}>
						<Text style={{ fontSize: 13, color: Colors.lightCoffee }}>{`${amount} € (${share} %)`}</Text>
					</View>
					<View style={[styles.column], { width: '30%' }}>
						<Button  
							compact={true} 
							mode="text" 
							uppercase={false} 
							onPress={toggleInput}
							labelStyle={{ color: Colors.primary, fontSize: 11 }}
						>
							{inputVisible ? 'Done' : 'Change'}
						</Button>
					</View>
				</View>

				{inputVisible &&
					<DecimalInput
						accessibilityLabel="Set amount"
						label="Set amount" 
						mode="outlined"
						style={[styles.input]} 
						initialValue={setAmountNumeric(amountInCents)}
						onChange={value => setPersonShare({
							person,
							value
						})}
					/>
				}
				
			</View>
		</View>

	)
}

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		width: '100%'
	}, 
	column: {
		flex: 1
	},
	formControl: {

	},
	input: {

	}
})

ExpensePersonShare.propTypes = {
	expenseToEdit: PropTypes.object,
	person: PropTypes.object,
	setExpenseToEdit: PropTypes.func,
	setAmountNumeric: PropTypes.func,
}

const mapStateToProps = (state) => {
	return {
		expenseToEdit: state.groups.expenseToEdit,
	}
}

const ConnectedExpensePersonShare = connect(
	mapStateToProps,
	{
		setExpenseToEdit,
	}
)(ExpensePersonShare)

export default ConnectedExpensePersonShare