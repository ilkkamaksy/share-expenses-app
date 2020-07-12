import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'

const EditGroupForm = props => {

	const { error, selectedGroup, editedGroupTitle, setTitle, saveGroup } = props

	console.log(props)

	const submitHandler = () => {
		saveGroup({title: editedGroupTitle, users: [], people: []})	
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
					<Button mode="contained" onPress={submitHandler}>
                        Save
					</Button>
				</View>
                
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({

})

EditGroupForm.propTypes = {
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
		setTitle,
		saveGroup
	}
)(EditGroupForm)

export default connectedEditGroupForm