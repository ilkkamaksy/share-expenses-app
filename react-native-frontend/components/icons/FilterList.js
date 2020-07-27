import React from 'react'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'
import Svg, { Path } from 'react-native-svg'

const FilterList = ( {size = 24, color = Colors.primary }) => {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			style={{ position: 'relative', width: size, height: size }}
			viewBox={`0 0 ${size} ${size}`}
		>
			<Path 
				style={{ 
					fill: color 
				}}
				d="M6 12.984v-1.969h12v1.969h-12zM3 6h18v2.016h-18v-2.016zM9.984 18v-2.016h4.031v2.016h-4.031z">
			</Path>
		</Svg>
	)
} 

FilterList.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string
}

export default FilterList