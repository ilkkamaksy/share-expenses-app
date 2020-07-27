import React from 'react'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'
import Svg, { Path } from 'react-native-svg'

const Ellipsis = ( {size = 24, color = Colors.primary }) => {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			style={{ position: 'relative', width: size, height: size }}
			viewBox={`0 0 ${size + 10} ${size + 10}`}
		>
			<Path 
				style={{ 
					fill: color 
				}}
				d="M6 19.5v3c0 0.828-0.672 1.5-1.5 1.5h-3c-0.828 0-1.5-0.672-1.5-1.5v-3c0-0.828 0.672-1.5 1.5-1.5h3c0.828 0 1.5 0.672 1.5 1.5zM6 11.5v3c0 0.828-0.672 1.5-1.5 1.5h-3c-0.828 0-1.5-0.672-1.5-1.5v-3c0-0.828 0.672-1.5 1.5-1.5h3c0.828 0 1.5 0.672 1.5 1.5zM6 3.5v3c0 0.828-0.672 1.5-1.5 1.5h-3c-0.828 0-1.5-0.672-1.5-1.5v-3c0-0.828 0.672-1.5 1.5-1.5h3c0.828 0 1.5 0.672 1.5 1.5z">
			</Path>
		</Svg>
	)
} 

Ellipsis.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string
}

export default Ellipsis