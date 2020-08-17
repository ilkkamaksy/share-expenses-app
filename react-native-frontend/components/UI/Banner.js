import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet } from 'react-native'
import { Banner as PaperBanner } from 'react-native-paper'

const Banner = ({ 
	textContent,
	leftButtonCallback,
	leftButtonText,
	rightButtonCallback,
	rightButtonText,
	visible
}) => {

	return (
		<PaperBanner
			style={styles.container}
			visible={visible}
			actions={[
				{
					label: leftButtonText,
					onPress: leftButtonCallback,
				},
				{
					label: rightButtonText,
					onPress: rightButtonCallback,
				},
			]}
			icon={({size}) => (
				<Image
					source={{
						uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
					}}
					style={{
						width: size,
						height: size,
					}}
				/>
			)}>
			{textContent}
		</PaperBanner>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 30
	}
})

Banner.propTypes = {
	textContent: PropTypes.string,
	leftButtonCallback: PropTypes.func,
	leftButtonText: PropTypes.string,
	rightButtonCallback: PropTypes.func,
	rightButtonText: PropTypes.string,
	visible: PropTypes.bool
}

export default Banner