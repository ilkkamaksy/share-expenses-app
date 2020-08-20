import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { 
	setExpenseToEdit, 
} from '../../store/actions/expenses'

import DecimalInput from '../UI/DecimalInput'
import Colors from '../../constants/Colors'

const ExpensePeopleShares = ({ 
	expenseToEdit,
	setExpenseToEdit,
}) => {

	console.log('expensetoedit', expenseToEdit)

	const setInitialAmount = (amount) => {
		return amount ? Number(amount / 100).toFixed(2) : amount
	}

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

	return (
		<View style={styles.section}>
			{expenseToEdit.people.map(person => {
				const amountInCents = Number(expenseToEdit.details.find(d => d.personId === person.id).share)
				const amount = Number(expenseToEdit.details.find(d => d.personId === person.id).share / 100).toFixed(2)
				const share = Number(((amount * 100) / expenseToEdit.amount) * 100).toFixed(2)
				return (
					<View key={`${person.id}-share-input`}>
						<View style={styles.formControl}>
							<Text style={{ fontWeight: '700', fontSize: 13, marginTop: 15 }}>{`${person.name}'s share`}</Text>
							<View style={[styles.row, { marginBottom: 0 }]}>
								<View style={[styles.column, { width: '70%'}]}>
									<Text style={{ fontSize: 13, color: Colors.lightCoffee }}>{`${share} % / ${amount} €`}</Text>
								</View>
								<View style={[styles.column], { width: '30%' }}>
									<Button  
										compact={true} 
										mode="text" 
										uppercase={false} 
										onPress={() => console.log('asfsaf')}
										labelStyle={{ color: Colors.primary, fontSize: 11 }}
									>
										Change
									</Button>
								</View>
							</View>

							<DecimalInput
								accessibilityLabel="Share"
								label="Share" 
								mode="outlined"
								style={[styles.input, { display: 'none' }]} 
								initialValue={setInitialAmount(amountInCents)} 
								onChange={value => setPersonShare({
									person,
									value
								})}
							/>
						</View>
					</View>
				)
			})}
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

ExpensePeopleShares.propTypes = {
	expenseToEdit: PropTypes.object,
	setExpenseToEdit: PropTypes.func,
}

const mapStateToProps = (state) => {
	return {
		expenseToEdit: state.groups.expenseToEdit,
	}
}

const ConnectedExpensePeopleShares = connect(
	mapStateToProps,
	{
		setExpenseToEdit,
	}
)(ExpensePeopleShares)

export default ConnectedExpensePeopleShares