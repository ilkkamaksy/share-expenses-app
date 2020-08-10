import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { removeExpense } from '../../store/actions/groups'

import Colors from '../../constants/Colors'

import ExpenseListItem from './ExpenseListItem'

const ExpenseList = ({ 
	group, 
	removeExpense 
}) => {

	return (
		<View style={styles.container}>

			<View style={styles.section}>

				{group.expenses.length > 0 && <Text style={styles.subtitle}>Group expenses</Text>}
			
				<FlatList 
					data={group.expenses} 
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
	subtitle: {
		color: Colors.secondary,
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 16,
		paddingBottom: 10,
		textTransform: 'uppercase'
	}
})

ExpenseList.propTypes = {
	group: PropTypes.object,
	removeExpense: PropTypes.func,
}

const connectedGroup = connect(null, {
	removeExpense
})(ExpenseList)

export default connectedGroup