import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Button } from 'react-native-paper'

import Colors from '../../constants/Colors'

import { setGroupToEdit } from '../../store/reducers/groups'
import FloatingActionButton from '../UI/FloatingActionButton'
import PersonListItem from './PersonListItem'

const Group = ({ group, navigation, setGroupToEdit }) => {

	const onEditGroup = () => {	
		setGroupToEdit(group)
		navigation.navigate('EditGroupInfo')
	}

	return (
		<View style={styles.container}>
			
			<Text style={styles.subtitle}>People in this group</Text>

			<FlatList 
				data={group.people} 
				keyExtractor={item=> item.id}
				renderItem={itemData => <PersonListItem 
					person={itemData.item} 
				/>} 
			/>
			<Button 
				mode="contained" 
				onPress={onEditGroup}
			>
				Edit group
			</Button>
			
			<FloatingActionButton onPress={() => console.log('pressed')} />
		</View>
	)
}

const styles = StyleSheet.create({
	subtitle: {
		color: Colors.coffee,
		fontSize: 14,
		marginBottom: 16,
		paddingBottom: 10,
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: StyleSheet.hairlineWidth,
	}
})

Group.propTypes = {
	group: PropTypes.object,
	onViewDetail: PropTypes.func,
	navigation: PropTypes.object,
	groupToEdit: PropTypes.object,
	setGroupToEdit: PropTypes.func
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const connectedGroup = connect(mapStateToProps, {
	setGroupToEdit
})(Group)

export default connectedGroup