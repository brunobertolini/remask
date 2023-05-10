interface CurrencyMaskProps {
	locale: string | string[]
	currency: string
	value: number | bigint
}

interface CurrencyUnmaskProps {
	locale: string | string[]
	currency: string
	value: string
}

export const mask = ({
	locale,
	currency,
	value,
}: CurrencyMaskProps): string => {
	const { format } = new Intl.NumberFormat(`${locale}`, {
		style: 'currency',
		currency,
	})

	return format(value)
}

export const unmask = ({ locale, currency, value }: CurrencyUnmaskProps) => {
	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	})

	const unformatted = `${value}`.replace(/[^0-9\-]/g, '')

	const parts = formatter.formatToParts(1.1)
	const fractionPart = parts.find((item) => item.type === 'fraction')

	return fractionPart
		? parseInt(unformatted) / (parseInt(fractionPart.value) * 10)
		: parseInt(unformatted)
}
