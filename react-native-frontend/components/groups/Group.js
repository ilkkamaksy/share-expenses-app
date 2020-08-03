import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation  } from '@react-navigation/native'

import { setGroupToEdit, removeExpense } from '../../store/reducers/groups'

import Colors from '../../constants/Colors'

import PersonListItem from './PersonListItem'
import ExpenseListItem from './ExpenseListItem'

const Group = ({ groupId, setGroupToEdit, removeExpense }) => {

	const group = useSelector(state => state.groups.userGroups.find(group => group.id === groupId))

	useEffect(() => {
		setGroupToEdit(group)
	}, [])
	
	const calculateBalances = () => {
		
		const balances = group.people.map(person => {

			let balance = 0 
		
			group.expenses.forEach(expense => {
				if (expense.details.length === 0) {
					return
				}

				expense.details.forEach(item => {
					if (item.person === person.id) {
						balance += item.paid - item.share
					}
				})
			})

			return {
				person,
				balance
			}
		})

		return balances
	}

	const navigation = useNavigation()

	console.log('group', group)
	
	return (
		<View style={styles.container}>
			
			<View style={styles.section}>
				<Text style={styles.subtitle}>Overview</Text>

				<View style={styles.row}>
					<Text style={styles.columnTitle}>Person</Text>
					<Text style={styles.columnTitle}>Balance</Text>
				</View>

				<FlatList 
					data={calculateBalances()} 
					style={styles.list}
					keyExtractor={item=> item.person.id}
					renderItem={itemData => <PersonListItem 
						item={itemData.item} 
					/>} 
				/>

				<Button 
					labelStyle={styles.summaryButton}
					mode="text" 
					color={Colors.primary}
					onPress={() => navigation.navigate('GroupBalanceDetails', { group: group })}
				>
					View summary
				</Button>

			</View>

			<View style={styles.section}>

				<Text style={styles.subtitle}>Recent expenses</Text>
			
				<FlatList 
					data={group.expenses.reverse()} 
					keyExtractor={item=> item.id}
					renderItem={itemData => <ExpenseListItem 
						people={group.people}
						expense={itemData.item} 
						removeExpense={() => removeExpense(itemData.item.id)}
					/>} 
				/>

			</View>
			
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		marginBottom: 50
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	list: {
		marginBottom: 20
	},
	columnTitle: {
		fontSize: 14,
		marginBottom: 12,
		fontWeight: 'bold',
		color: Colors.coffee
	},
	subtitle: {
		color: Colors.secondary,
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 16,
		paddingBottom: 10,
		textTransform: 'uppercase'
	},
	summaryButton: {
		fontSize: 12,
		fontWeight: 'bold'
	}
})

Group.propTypes = {
	groupId: PropTypes.string,
	onViewDetail: PropTypes.func,
	navigation: PropTypes.object,
	groupToEdit: PropTypes.object,
	setGroupToEdit: PropTypes.func,
	removeExpense: PropTypes.func
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const connectedGroup = connect(mapStateToProps, {
	setGroupToEdit,
	removeExpense
})(Group)

export default connectedGroup