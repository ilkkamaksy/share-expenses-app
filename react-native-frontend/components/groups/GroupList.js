import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native'
import { ActivityIndicator, Checkbox, Button } from 'react-native-paper'

import { getGroups, setGroupToEdit } from '../../store/actions/groups'
import { acceptGroupInvite, rejectGroupInvite, getInvitationByGroup } from '../../store/actions/invitations'

import Heading from '../UI/Heading'
import Paragraph from '../UI/Paragraph'
import GroupListItem from './GroupListItem'
import FilterList from '../icons/FilterList'
import Banner from '../UI/Banner'
import Colors from '../../constants/Colors'
	
const GroupList = ({ 
	getGroups, 
	setGroupToEdit,
	referrerUrl,
	getInvitationByGroup,
	acceptGroupInvite,
	rejectGroupInvite,
	fetching, 
	userGroups,
	openAccessInvitation,
	navigation
}) => {
	
	const [modalVisible, setModalVisible] = useState(false)
	const [sortBy, setSortBy] = useState('lastUpdatedAt')
	const [selectedSortingText, setSelectedSortingText] = useState('Most recently updated first')
	const [bannerVisible, setBannerVisible] = useState(false)
	const [bannerTextContent, setBannerTextContent] = useState('')

	useEffect(() => {
	
		if (fetching && userGroups.length === 0) {
			getGroups()
		}

		const getReferrerInvitation = async () => {
			await getInvitationByGroup(referrerUrl.queryParams.id)
		}

		if (!fetching && referrerUrl && referrerUrl.queryParams && !openAccessInvitation) {
			getReferrerInvitation()
		}

		setBannerVisible(openAccessInvitation && !userGroups.find(group => group.id === openAccessInvitation.group.id) ? true : false)

		if (openAccessInvitation) {
			setBannerTextContent(`Join group "${openAccessInvitation.group.title}" shared by ${openAccessInvitation.owner.email}?`)
		}

	}, [fetching, openAccessInvitation])

	const onSetSortingOption = (sortingOption) => {
		
		getGroups(sortingOption)
		setSortBy(sortingOption.sortBy)
		setModalVisible(!modalVisible)

		if (sortingOption.sortBy === 'createdAt') {
			setSelectedSortingText('Most recently created first')
		} else if (sortingOption.sortBy === 'title') {
			setSelectedSortingText('From A to Z by title')
		} else {
			setSelectedSortingText('Most recently updated first')
		}
	}

	const onPressGroupItem = (group) => {
		setGroupToEdit(group)
		navigation.navigate('GroupItem')
	}

	const onAcceptInvite = async () => {
		await acceptGroupInvite(openAccessInvitation.id)
		getGroups()
	}

	const onRejectInvite = () => {
		rejectGroupInvite()
	}

	if (fetching) {
		return (
			<ActivityIndicator animating={true} color={Colors.primary} />
		)
	}

	if (!fetching && userGroups.length === 0) {
		return (
			<View style={styles.container}>
			
				{bannerVisible ?
					<Banner 
						visible={bannerVisible}
						textContent={bannerTextContent} 
						leftButtonCallback={() => onAcceptInvite()} 
						leftButtonText="Yes"
						rightButtonCallback={() => onRejectInvite()}
						rightButtonText="Nope"
					/>
					:
					<></>
				}

				<Text style={[styles.subtitle, { marginBottom: 0, marginTop: 60 }]}>No groups, not yet!</Text>
				<Paragraph style={[{ 
					textAlign: 'center', 
					fontSize: 13, 
					marginBottom: 5, 
					color: Colors.lightCoffee, 
					lineHeight: 20 
				}]}>
						Add a group to get started!
				</Paragraph>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			
			{bannerVisible ?
				<Banner 
					visible={bannerVisible}
					textContent={bannerTextContent} 
					leftButtonCallback={() => onAcceptInvite()} 
					leftButtonText="Yes"
					rightButtonCallback={() => onRejectInvite()}
					rightButtonText="Nope"
				/>
				:
				<></>
			}
			

			<TouchableOpacity style={styles.sorting} onPress={() => setModalVisible(!modalVisible)}>
				<Text style={styles.selectedSortingText}>{selectedSortingText}</Text>
				<FilterList size={24} color={Colors.primary} />
			</TouchableOpacity>

			<Modal visible={modalVisible} style={styles.modalView}>
				<View style={styles.modalContent}>

					<Heading style={[styles.modalHeading]}>Sort groups</Heading>

					<Checkbox.Item 
						label="Most recently updated first"
						status={sortBy === 'lastUpdatedAt' ? 'checked' : 'unchecked'}
						onPress={() => {
							onSetSortingOption({ sortBy: 'lastUpdatedAt', order: -1 })
						}}
						style={{ paddingLeft: 0 }}
					/>

					<Checkbox.Item 
						label="Most recently created first"
						status={sortBy === 'createdAt' ? 'checked' : 'unchecked'}
						onPress={() => {
							onSetSortingOption({ sortBy: 'createdAt', order: -1 })
						}}
						style={{ paddingLeft: 0 }}
					/>
					
					<Checkbox.Item 
						label="Sort by title From A to Z"
						status={sortBy === 'title' ? 'checked' : 'unchecked'}
						onPress={() => {
							onSetSortingOption({ sortBy: 'title', order: 1 })
						}}
						style={{ paddingLeft: 0 }}
					/>

					<Button 
						style={styles.closeModalButton}
						mode="contained" 
						onPress={() => setModalVisible(!modalVisible)} 
						color={Colors.primary}
						labelStyle={{color: Colors.white}}
					>
                        Close
					</Button>
				</View>
			</Modal>
			
			{userGroups.map(group => {
				return (
					<GroupListItem 
						key={group.id}
						item={group} 
						onViewDetail={() => onPressGroupItem(group)}
					/>
				)
			})}

		</View>
		
	) 
}

const styles = StyleSheet.create({
	sorting: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
		paddingBottom: 16,
		borderBottomColor: '#ddd',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	selectedSortingText: {
		color: Colors.lightCoffee,
		fontSize: 13,
	},
	modalContent: {
		flex: 1,
		justifyContent: 'flex-start',
		marginVertical: '40%',
		marginHorizontal: 40
	},
	modalView: {
		margin: 0,
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 4,
		paddingVertical: 20,
		paddingHorizontal: 30,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalHeading: {
		fontSize: 18,
		textAlign: 'left',
		marginBottom: 5,
		paddingBottom: 15,
		color: Colors.primary,
		borderBottomColor: '#ddd',
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	sortingOption: {
		paddingVertical: 10,
		borderBottomColor: '#ddd',
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	sortingOptionLabel: {
		fontSize: 14,
		color: Colors.coffee
	},
	closeModalButton: {
		marginTop: 40
	},
	subtitle: {
		color: Colors.secondary,
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 16,
		paddingBottom: 10,
		textTransform: 'uppercase',
		textAlign: 'center'
	},
})

GroupList.propTypes = {
	navigation: PropTypes.object,
	fetching: PropTypes.bool,
	userGroups: PropTypes.array,
	openAccessInvitation: PropTypes.object,
	referrerUrl: PropTypes.object,
	getGroups: PropTypes.func,
	setGroupToEdit: PropTypes.func,
	acceptGroupInvite: PropTypes.func,
	rejectGroupInvite: PropTypes.func,
	getInvitationByGroup: PropTypes.func,
}

const mapStateToProps = state => {
	return {
		userdata: state.user.userdata,
		fetching: state.groups.fetching,
		error: state.groups.error,
		getGroupsFail: state.groups.getGroupsFail,
		userGroups: state.groups.userGroups,
		openAccessInvitation: state.invitations.openAccessInvitation,
		referrerUrl: state.invitations.referrerUrl
	}
}

const connectedGroupList = connect(
	mapStateToProps, 
	{
		getGroups,
		setGroupToEdit,
		acceptGroupInvite,
		rejectGroupInvite,
		getInvitationByGroup
	}
)(GroupList)

export default connectedGroupList