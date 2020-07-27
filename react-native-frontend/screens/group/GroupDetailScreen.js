import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import Group from '../../components/groups/Group'

import Hero from '../../components/UI/Hero'
import Heading from '../../components/UI/Heading'
import Paragraph from '../../components/UI/Paragraph'
import ContentContainer from '../../components/UI/ContentContainer'
import Colors from '../../constants/Colors'

import FloatingActionButton from '../../components/UI/FloatingActionButton'
import Edit from '../../components/icons/Edit'

const GroupDetailScreen = props => {

	useEffect(() => {
		props.navigation.setOptions({title: props.route.params.group.title})
	}, [])
	
	return (
		<View style={styles.container}>
			<ScrollView>
				<Hero>
					<Heading style={[styles.header]}>
						{props.route.params.group.title}
					</Heading>
					<Paragraph style={[styles.intro]}>
						{props.route.params.group.location}
					</Paragraph>

					<View style={styles.actions}>
						<View>
							<TouchableOpacity onPress={() => props.navigation.navigate('EditGroupInfo')} style={styles.actionLinkContainer}>
								<Edit size={14} color={Colors.white} />
								<Text style={styles.actionLink}>Edit</Text>
							</TouchableOpacity>
						</View>
					</View>
					
				</Hero>
				<ContentContainer>
					<Group 
						group={props.route.params.group}
						navigation={props.navigation}
					/>
				</ContentContainer>
			
			
			</ScrollView>

			<FloatingActionButton onPress={() => props.navigation.navigate('EditExpense')} />
		</View>
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
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		bottom: 10,
	}, 
	actionLinkContainer: {
		backgroundColor: Colors.primary,
		paddingVertical: 4,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center'
	},
	actionLink: {
		textTransform: 'uppercase',
		color: Colors.white,
		fontSize: 10,
		fontWeight: 'bold',
		marginLeft: 4
	}
})

GroupDetailScreen.propTypes = {
	route: PropTypes.object,
	navigation: PropTypes.object
}

export default GroupDetailScreen