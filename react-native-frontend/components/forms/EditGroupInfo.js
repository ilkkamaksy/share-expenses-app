import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'

import { setTitle, setDate } from '../../store/reducers/groups'

const EditGroupInfo = props => {

	const { error, groupToEdit, setTitle, setDate, navigation } = props
   
	useEffect(() =>{
		setDate(new Date(Date.now()))
	}, [])

	const [showDatePicker, setShowDatePicker] = useState(false)
	const [showTimePicker, setShowTimePicker] = useState(false)

	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate || groupToEdit.date
		setShowDatePicker(false)
		setDate(currentDate)
		setShowTimePicker(true)
	}

	const onChangeTime = (event, selectedTime) => {
		const currentTime = selectedTime || groupToEdit.date
		setShowTimePicker(false)
		setDate(currentTime)
	}

	const showDatepicker = () => {
		setShowDatePicker(true)
	}

	return (
		<ScrollView>

			<View>
				<Text>{error}</Text>
			</View>
			
			<View style={styles.form}>
				<View style={styles.formControl}>
					<TextInput 
						accessibilityLabel="Title"
						label="Title" 
						style={styles.input} 
						value={groupToEdit.title}
						onChangeText={text => setTitle(text)}
					/>
				</View>
				
				<View style={styles.formControl}>
					<View style={styles.row}>
						<View style={styles.rowItem}>
							<Text>{`When: ${groupToEdit.date.toLocaleDateString()}, at ${groupToEdit.date.toLocaleTimeString()}`}</Text>
						</View>
						<View style={styles.rowItem}>
							<Button style={styles.rowItem} compact={true} mode="text" uppercase={false} onPress={showDatepicker}>
								(Change)
							</Button> 
						</View>
					</View>
					
					{showDatePicker && (
						<DateTimePicker
							testID="dateTimePicker"
							value={groupToEdit.date}
							mode="date"
							is24Hour={true}
							display="default"
							onChange={onChangeDate}
						/>
					)}
					{showTimePicker && (
						<DateTimePicker
							testID="dateTimePicker"
							value={groupToEdit.date}
							mode="time"
							is24Hour={false}
							display="default"
							onChange={onChangeTime}
						/>
					)}
				</View>


				<View style={styles.formControl}>
					<Button 
						disabled={groupToEdit.title.length > 0 ? false : true} 
						mode="contained" 
						onPress={() => navigation.navigate('EditGroupPeople')}
					>
                        Next
					</Button>
				</View>
                
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between'
	}, 
	rowItem: {
		flex: 0
	}
})

EditGroupInfo.propTypes = {
	navigation: PropTypes.object,
	user: PropTypes.object,
	fetching: PropTypes.bool,
	error: PropTypes.string,
	groupToEdit: PropTypes.object,
	setTitle: PropTypes.func,
	setDate: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		fetching: state.groups.fetching,
		error: state.groups.error,
		groupToEdit: state.groups.groupToEdit
	}
}

const connectedEditGroupInfo = connect(
	mapStateToProps,
	{
		setTitle,
		setDate
	}
)(EditGroupInfo)

export default connectedEditGroupInfo