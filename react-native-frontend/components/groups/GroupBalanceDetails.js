import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import Colors from '../../constants/Colors'
import BalanceListItem from './BalanceListItem'

const GroupBalanceDetails = ({ 
	group, 
	groupTotals, 
	groupBalanceData
}) => {

	if (groupTotals.length === 0 || groupBalanceData.length === 0) {
		return <ActivityIndicator animating={true} color={Colors.primary} />
	}

	console.log('final----', groupBalanceData)

	return (
		<View style={styles.container}>

			<Text style={styles.subtitle}>Balance summary</Text>
			
			<FlatList 
				data={group.people} 
				keyExtractor={item => item.id}
				renderItem={itemData => <BalanceListItem 
					person={itemData.item}
					debtors={groupBalanceData.filter(item => item.debtor.id === itemData.item.id)}
					totals={groupTotals.find(item => item.id === itemData.item.id)}
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
	groupTotals: PropTypes.array,
	groupBalanceData: PropTypes.array,
}

const mapStateToProps = state => {
	return {
		groupTotals: state.groups.groupTotals,
		groupBalanceData: state.groups.groupBalanceData
	}
}

const ConnectedGroupBalanceDetails = connect(mapStateToProps, {})(GroupBalanceDetails)

export default ConnectedGroupBalanceDetails