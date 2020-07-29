import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import Colors from '../../constants/Colors'

import BalanceListItem from './BalanceListItem'
import person from '../../../backend/models/person'

const GroupBalanceDetails = ({ group }) => {

	const calculateBalance = () => {
		
		let personData = []

		group.expenses.forEach(expense => {
			
			if (expense.details.length === 0) {
				return
			}

			expense.details.forEach(item => {
				personData = [
					...personData,
					{
						personId: item.person,
						totalSpending: item.share,
						balance: item.paid - item.share,
						paid: item.paid,
						share: item.share,
						debtors: [],
						receivables: null
					}
				]
			})

			personData.forEach(i => {
				let debtors = []
				if (i.balance < 0) {
					return
				}
				personData.forEach(j => {
					if (i.personId !== j.personId && j.balance < 0) {
						debtors.push(j.personId) 
					}
				})
				i.debtors = debtors
				i.receivables = i.balance / debtors.length
			})
		})
		
		console.log('persondata', personData)
		return personData
	}

	const balanceData = calculateBalance()
	
	return (
		<View style={styles.container}>

			<Text style={styles.subtitle}>Balance summary</Text>
			
			<FlatList 
				data={balanceData} 
				keyExtractor={item=> item.personId}
				renderItem={itemData => <BalanceListItem 
					data={itemData.item}
					people={group.people}
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