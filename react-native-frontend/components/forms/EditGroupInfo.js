import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';

import { setTitle } from '../../store/reducers/groups'

const EditGroupInfo = props => {

	const { error, editedGroupTitle, setTitle } = props
	
    
	const [date, setDate] = useState(new Date(1598051730000))
	const [mode, setMode] = useState('date')
	const [show, setShow] = useState(false)

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date
		setShow(Platform.OS === 'ios')
		setDate(currentDate)
	}



	const showMode = currentMode => {
		setShow(true)
		setMode(currentMode)
	}

	const showDatepicker = () => {
		showMode('date')
	}

	const submitHandler = () => {
		// setGroupDetails({title: editedGroupTitle})	
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
						value={editedGroupTitle}
						onChangeText={text => setTitle(text)}
					/>
				</View>
				
				<View style={styles.formControl}>
					<Text>{`Date: ${date}`}</Text>
					<Button mode="text" onPress={showDatepicker}>
                        Change date
					</Button> 
					{show && (
						<DateTimePicker
							testID="dateTimePicker"
							value={date}
							mode={mode}
							is24Hour={true}
							display="default"
							onChange={onChange}
						/>
					)}
				</View>

				<View style={styles.formControl}>
					<Button mode="contained" onPress={submitHandler}>
                        Next
					</Button>
				</View>
                
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({

})

EditGroupInfo.propTypes = {
	navigation: PropTypes.object,
	user: PropTypes.object,
	fetching: PropTypes.bool,
	error: PropTypes.string,
	editedGroupTitle: PropTypes.string,
	selectedGroup: PropTypes.object,
	setTitle: PropTypes.func,
	saveGroup: PropTypes.func
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		fetching: state.groups.fetching,
		error: state.groups.error,
		editedGroupTitle: state.groups.editedGroupTitle
	}
}

const connectedEditGroupForm = connect(
	mapStateToProps,
	{
		setTitle
	}
)(EditGroupInfo)

export default connectedEditGroupForm