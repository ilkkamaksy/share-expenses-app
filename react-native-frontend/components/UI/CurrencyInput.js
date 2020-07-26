import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
	prefix: '',
	suffix: '',
	includeThousandsSeparator: false,
	thousandsSeparatorSymbol: '',
	allowDecimal: true,
	decimalSymbol: ',',
	decimalLimit: 2, 
	integerLimit: 100, 
	allowNegative: false,
	allowLeadingZeroes: false,
}

const CurrencyInput = ({ maskOptions, ...inputProps }) => {
	const currencyMask = createNumberMask({
		...defaultMaskOptions,
		...maskOptions,
	})

	return <MaskedInput mask={currencyMask} {...inputProps} />
}

CurrencyInput.defaultProps = {
	inputMode: 'numeric',
	maskOptions: {},
}

CurrencyInput.propTypes = {
	inputmode: PropTypes.string,
	maskOptions: PropTypes.shape({
		prefix: PropTypes.string,
		suffix: PropTypes.string,
		includeThousandsSeparator: PropTypes.boolean,
		thousandsSeparatorSymbol: PropTypes.string,
		allowDecimal: PropTypes.boolean,
		decimalSymbol: PropTypes.string,
		decimalLimit: PropTypes.string,
		requireDecimal: PropTypes.boolean,
		allowNegative: PropTypes.boolean,
		allowLeadingZeroes: PropTypes.boolean,
		integerLimit: PropTypes.number,
	}),
}

export default CurrencyInput