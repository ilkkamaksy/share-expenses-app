import React, { useState} from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Menu, Divider, Provider } from 'react-native-paper'

import Ellipsis from '../icons/Ellipsis'
import Colors from '../../constants/Colors'

const MenuTopRight = () => {
    
	const [visible, setVisible] = useState(true)

	const openMenu = () => setVisible(true)

	const closeMenu = () => setVisible(false)

	return (
		<Provider>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-end',
				}}>
				<Menu
					visible={visible}
					onDismiss={closeMenu}
					style={styles.menu}
					anchor={
						<TouchableOpacity onPress={openMenu} style={styles.toggleButton}>
							<Ellipsis size={20} color={Colors.white} />
						</TouchableOpacity>
					}>
					<Menu.Item onPress={() => alert('pressed')} title="Home" style={styles.menuItem} />
					<Menu.Item onPress={() => {}} title="Item 2" style={styles.menuItem} />
					<Divider />
					<Menu.Item onPress={() => {}} title="Item 3" style={styles.menuItem} />
				</Menu>
			</View>
		</Provider>
	)
}

const styles = StyleSheet.create({
	toggleButton: {
		position: 'relative',
		top: 20,
		right: 0,
		zIndex: 10,
	},
	menu: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		position: 'relative',
		top: 50,
		zIndex: 10,
		maxWidth: 340
	},
	menuItem: {
		position: 'relative',
		zIndex: 100,
	}
})

export default MenuTopRight