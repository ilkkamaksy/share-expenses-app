import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import Colors from '../../constants/Colors'

import BalanceListItem from './BalanceListItem'

const GroupBalanceDetails = ({ group }) => {

	const calculateBalance = () => {
		
		let balanceData = group.people.map(person => {
			return {
				person,
				totalSpending: 0,
				balance: 0,
				receivables: [
					{
						person,
						totalSpending: 0,
						balance: 0,
						paid: 0,
						share: 0,
						debt: 0
					}
				],
				debtors: group.people.map(debtor => {
					return {
						id: debtor.id,
						name: debtor.name,
						debt: 0,
						creditor: ''
					}
				}),
				creditors: group.people.map(creditor => {
					return {
						id: creditor.id,
						name: creditor.name,
						credit: 0
					}
				}),
			}
		})

		console.log('initial balanceData', balanceData)

		group.expenses.forEach(expense => {
			
			if (expense.details.length === 0) {
				return
			}

			expense.details.forEach(expenseItem => {
	
				balanceData = balanceData.map(dataItem => {
					if (dataItem.person.id === expenseItem.person) {
						return {
							...dataItem,
							totalSpending: dataItem.totalSpending + expenseItem.share,
							balance: dataItem.balance + expenseItem.balance,
							debtors: dataItem.debtors.map(debtor => {
								// Skip if debtor and expenseItem person are the same
								if (debtor.id === expenseItem.person) {
									return {
										...debtor,
										creditor: expenseItem.person
									}
								}
								
								const currentDebtor = expense.details.find(d => d.person === debtor.id)

								console.log('expenseITem', expenseItem)
								console.log('currentdebtor', currentDebtor)
								console.log('debtor', debtor)

								let currentItemDebt = 0

								// If debtor has positive balance AND is in debt to current expenseItem person,
								// deduct balance from that debt
								if (currentDebtor.balance > 0 && debtor.debt < 0) {
									currentItemDebt = currentDebtor.balance + debtor.debt
								} 
																
								// If debtor has negative balance AND expenseItem balance is positive,
								// set currentItemDebt to either expenseItem balance or currentDebtor balance, which ever
								// is smaller
								if (currentDebtor.balance < 0 && expenseItem.balance > 0) {
									currentItemDebt = (-1 * Math.min(expenseItem.balance, Math.abs(currentDebtor.balance))) + debtor.debt
								}

								console.log('currentItemDebt', currentItemDebt)

								return {
									...debtor,
									debt: currentItemDebt,
									creditor: expenseItem.person
								}
							})
						}
					}
					console.log('balanceData', balanceData)
					return dataItem
				})
			})

			let temp = balanceData
			temp.forEach(dataItem => {
				dataItem.debtors.forEach(debtorItem => {
					if (debtorItem.debt > 0) {
						console.log(debtorItem)
						let reference = balanceData.find(subItem => subItem.person.id === debtorItem.id)
						console.log('reference', reference)
						reference.debtors.forEach(debtor => {
							if (debtor.id === debtorItem.creditor) {
								debtor.debt = debtorItem.debt + debtor.debt
							}
						})
					}
				})
			})

			balanceData = temp
		})
		
		console.log('balancedata end', balanceData)
		return balanceData
	}

	const [balanceData, setBalanceData] = useState([])

	useEffect(() => {
		setBalanceData(calculateBalance())
	}, [])
	
	return (
		<View style={styles.container}>

			<Text style={styles.subtitle}>Balance summary</Text>
			
			<FlatList 
				data={balanceData} 
				keyExtractor={item => item.person.id}
				renderItem={itemData => <BalanceListItem 
					data={itemData.item}
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