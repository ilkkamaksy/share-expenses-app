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
	
	if (!groupToEdit.id) {
		navigation.navigate('GroupList')
		return <></>
	}

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
					Edit group
				</Heading>

				<View style={styles.actions}>
					<View style={styles.row}>
						<TouchableOpacity 
							onPress={() => setTab('details')} 
							style={styles.actionLinkContainer}
						>
							<Text style={styles.actionLink}>General</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							onPress={() => setTab('people')} 
							style={styles.actionLinkContainer}
						>
							<Text style={styles.actionLink}>Edit people</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							onPress={() => setTab('users')} 
							style={styles.actionLinkContainer}
						>
							<Text style={styles.actionLink}>Group Users</Text>
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
		fontSize: 22
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
		marginTop: 20,
		marginBottom: -10,
		width: '100%'
	}, 
	actionLinkContainer: {
		backgroundColor: Colors.primary,
	},
	actionLink: {
		textTransform: 'uppercase',
		color: Colors.white,
		fontSize: 11,
		fontWeight: 'bold',
		marginLeft: 4,
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