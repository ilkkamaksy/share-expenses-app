import React from 'react'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'
import Svg, { Path } from 'react-native-svg'

const ArrowLeft = ( {size = 24, color = Colors.primary }) => {
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
				d="M12.586 27.414l-10-10a2 2 0 010-2.828l10-10a2 2 0 112.828 2.828L8.828 14H28a2 2 0 110 4H8.828l6.586 6.586c.39.39.586.902.586 1.414s-.195 1.024-.586 1.414a2 2 0 01-2.828 0z">
			</Path>
		</Svg>
	)
} 

ArrowLeft.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string
}

export default ArrowLeft