import React from 'react'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'
import Svg, { Path } from 'react-native-svg'

const Share = ( {size = 24, color = Colors.primary }) => {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			style={{ position: 'relative', width: size, height: size }}
			viewBox={`0 0 ${size + 20} ${size + 20}`}
		>
			<Path 
				style={{ 
					fill: color 
				}}
				d="M18 7.762v-7.762l12 12-12 12v-7.932c-13.961-0.328-13.362 9.493-9.808 15.932-8.772-9.482-6.909-24.674 9.808-24.238z">
			</Path>
		</Svg>
	)
} 

Share.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string
}

export default Share