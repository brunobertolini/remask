interface CurrncyMaskProps {
	locale: string | string[]
	currency: string
	value: number | bigint
}

export const mask = ({ locale, currency, value }: CurrncyMaskProps): string => {
	const { format } = new Intl.NumberFormat(`${locale}`, {
		style: 'currency',
		currency,
	})

	return format(value)
}

export const unmask = ({
	locale,
	currency,
	value,
}: CurrncyMaskProps): number => {
	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	})

	const decimalPart = formatter
		.formatToParts(1.1)
		.find((item) => item.type === 'decimal')

	const decimalSeparator = decimalPart ? decimalPart.value : false
	const regex = new RegExp(`[^\-0-9${decimalSeparator}]`, 'g')
	const unformatted = `${value}`.replace(regex, '')

	return decimalSeparator && decimalSeparator !== '.'
		? parseFloat(unformatted.replace(decimalSeparator, '.'))
		: parseFloat(unformatted)
}
