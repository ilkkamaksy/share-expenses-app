import React from 'react'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'
import Svg, { Path } from 'react-native-svg'

const AngleRight = ( {size = 24, color = Colors.primary }) => {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			style={{ position: 'relative', width: size, height: size }}
			viewBox={`0 0 ${size + 6} ${size + 6}`}
		>
			<Path 
				style={{ 
					fill: color 
				}}
				d="M9.297 15c0 0.125-0.063 0.266-0.156 0.359l-7.281 7.281c-0.094 0.094-0.234 0.156-0.359 0.156s-0.266-0.063-0.359-0.156l-0.781-0.781c-0.094-0.094-0.156-0.219-0.156-0.359 0-0.125 0.063-0.266 0.156-0.359l6.141-6.141-6.141-6.141c-0.094-0.094-0.156-0.234-0.156-0.359s0.063-0.266 0.156-0.359l0.781-0.781c0.094-0.094 0.234-0.156 0.359-0.156s0.266 0.063 0.359 0.156l7.281 7.281c0.094 0.094 0.156 0.234 0.156 0.359z">
			</Path>
		</Svg>
	)
} 

AngleRight.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string
}

export default AngleRight