import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import Colors from '../../constants/Colors'

import BalanceListItem from './BalanceListItem'

const GroupBalanceDetails = ({ group }) => {

	const initDebtorData = () => {
		
		let initialData = [] 
		
		group.people.map(creditor => {	
			let temp = []		
			group.people.forEach(debtor => {
				if (debtor.id === creditor.id) {
					return
				}

				temp = [...temp, {
					debtor,
					creditor,
					balance: 0,
				}]
				
			})
			initialData = [...initialData, ...temp]
		})

		return initialData
	}

	const calculateDebtorBalances = () => {
		
		let balanceData = initDebtorData() 

		group.expenses.map(expense => {
			
			const creditors = expense.details.filter(expenseItem => expenseItem.balance > 0)
			
			expense.details.map(expenseItem => {
				
				if (expenseItem.balance < 0) {
					
					creditors.forEach(creditor => {
						
						const debtorBalanceData = findDataItemByCreditorAndDebtor(balanceData, creditor.person, expenseItem.person)
						const creditorReference = findDataItemByCreditorAndDebtor(balanceData, expenseItem.person, creditor.person)

						let balance = debtorBalanceData.balance - Math.min(Math.abs(creditor.balance), Math.abs(expenseItem.balance))

						// if creditor is in debt to current debtor, update creditor balance 
						if (creditorReference.balance < 0 && balance < 0) {
							console.log('joo', creditorReference.debtor.name, creditorReference.creditor.name, creditorReference.balance, balance)

							balanceData = balanceData.map(dataItem => 
								dataItem.creditor.id === creditorReference.creditor.id && dataItem.debtor.id === creditorReference.debtor.id 
									? updateBalanceDataItem(dataItem, dataItem.balance - balance) 
									: dataItem
							)

							balance = balance - creditorReference.balance
						}

						balanceData = balanceData.map(dataItem => 
							dataItem.debtor.id === debtorBalanceData.debtor.id && dataItem.creditor.id === debtorBalanceData.creditor.id 
								? updateBalanceDataItem(debtorBalanceData, balance)
								: dataItem
						)
					})
					
				}
			})
		})

		return balanceData
	}

	const findDataItemByCreditorAndDebtor = (balanceData, creditorId, debtorId) => {
		return balanceData.find(balanceDataItem => 
			balanceDataItem.debtor.id === debtorId 
			&& balanceDataItem.creditor.id === creditorId)
	}

	const updateBalanceDataItem = (balanceDataItem, balance) => {
		return {
			...balanceDataItem,
			balance: Math.min(balance, 0)
		}
	}

	const calculateTotals = () => {

		let totals = group.people.map(person => {
			return {
				...person,
				totalSpending: 0,
				balance: 0
			}
		})

		group.expenses.map(expense => {
			expense.details.map(expenseItem => {
				totals = totals.map(person => {
					if (person.id === expenseItem.person) {
						return {
							...person,
							totalSpending: person.totalSpending + expenseItem.share,
							balance: person.balance + expenseItem.balance
						}
					} else {
						return person
					}
				})	
					
			})
			
		})
		
		return totals
	}

	const [totals, setTotals] = useState([])
	const [debtorBalanceData, setDebtorBalanceData] = useState([])

	useEffect(() => {		
		setDebtorBalanceData(calculateDebtorBalances())
		setTotals(calculateTotals())
	}, [])

	if (totals.length === 0 || debtorBalanceData.length === 0) {
		return <></>
	}

	console.log('final----', debtorBalanceData)

	return (
		<View style={styles.container}>

			<Text style={styles.subtitle}>Balance summary</Text>
			
			<FlatList 
				data={group.people} 
				keyExtractor={item => item.id}
				renderItem={itemData => <BalanceListItem 
					person={itemData.item}
					debtors={debtorBalanceData.filter(item => item.debtor.id === itemData.item.id)}
					totals={totals.find(item => item.id === itemData.item.id)}
				/>} 
			/>
			
			
		</View>
	)
}

const styles = StyleSheet.create({
	subtitle: {
		color: Colors.secondary,
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 16,
		paddingBottom: 10,
		textTransform: 'uppercase'
	},

})

GroupBalanceDetails.propTypes = {
	group: PropTypes.object,
}

export default GroupBalanceDetails