import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Button } from 'react-native-paper'

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
			<View style={styles.group}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>{group.title}</Text>
					<Text>{group.location}</Text>
				</View>
			</View>
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
	container: {
		flex: 1
	},
	group: {
		borderRadius: 4,
		backgroundColor: 'white',
		margin: 10,
	},
	textContainer: {
		margin: 10,
		textAlign: 'center'
	},
	title: {
		fontSize: 18,
		marginBottom: 8
	},
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