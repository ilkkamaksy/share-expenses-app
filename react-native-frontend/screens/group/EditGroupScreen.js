import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import EditGroupInfo from '../../components/forms/EditGroupInfo'
import EditGroupPeople from '../../components/forms/EditGroupPeople'
import EditGroupUsers from '../../components/forms/EditGroupUsers'

const EditGroupScreen = ({ groupToEdit, navigation }) => {
	
	const [tab, setTab] = useState('')

	useEffect(() => {
		setTab('details')
	}, [])
	
	const getCurrentTab = () => {
		if (tab === 'people') {
			return <EditGroupPeople navigation={navigation} />
		} else if (tab === 'users') {
			return <EditGroupUsers navigation={navigation} />
		}
		return <EditGroupInfo navigation={navigation} />
	}

	return (
		<ScrollView>
			<Hero>
				<Heading style={[styles.header]}>
					{`Edit "${groupToEdit.title}"`}
				</Heading>


				<View style={styles.actions}>
					<View style={styles.row}>
						<TouchableOpacity 
							onPress={() => setTab('details')} 
							style={styles.actionLinkContainer}
						>
							<Text style={styles.actionLink}>Edit Details</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							onPress={() => setTab('people')} 
							style={styles.actionLinkContainer}
						>
							<Text style={styles.actionLink}>Edit People</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							onPress={() => setTab('users')} 
							style={styles.actionLinkContainer}
						>
							<Text style={styles.actionLink}>Edit Users</Text>
						</TouchableOpacity>
					</View>
				</View>

				
			</Hero>

			<ContentContainer>
				{getCurrentTab()}
			</ContentContainer>
				
		</ScrollView>
		
	)
}
const styles = StyleSheet.create({
	header: {
		color: Colors.white,
		textAlign: 'left',
		fontSize: 26
	},
	intro: {
		textAlign: 'left',
		color: Colors.white,
		fontSize: 14
	},
	container: {
		backgroundColor: Colors.white,
		flex: 1
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%'
	},
	actions: {
		position: 'absolute',
		bottom: 10,
		width: '100%'
	}, 
	actionLinkContainer: {
		backgroundColor: Colors.primary,
		paddingVertical: 4,
	},
	actionLink: {
		textTransform: 'uppercase',
		color: Colors.white,
		fontSize: 13,
		fontWeight: 'normal',
		marginLeft: 4,
		letterSpacing: 0.3
	}
})

EditGroupScreen.propTypes = {
	navigation: PropTypes.object,
	groupToEdit: PropTypes.object
}

const mapStateToProps = state => {
	return {
		groupToEdit: state.groups.groupToEdit
	}
}

const ConnectedEditGroupInfoScreen = connect(mapStateToProps, {})(EditGroupScreen)

export default ConnectedEditGroupInfoScreen