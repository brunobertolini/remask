interface CurrencyMaskProps {
	/** Locale used to format. Refer to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument MDN Docs} for futher explanation.*/
	locale: string | string[]
	/** The currency to use in currency formatting. Possible values are the `ISO 4217` currency codes. Refer to {@link https://wikipedia.org/wiki/ISO_4217 Wikipedia} to see all codes.*/
	currency: string
	/** The amount to be formatted. */
	value: number | bigint
}

interface CurrencyUnmaskProps {
	/** The locale used to format the amount. */
	locale: string | string[]
	/** The currency used to format the amount. */
	currency: string
	/** The formatted amount. */
	value: string
}

/** Formats a given amount by the `locale` and `currency` provided.*/
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

/** Given a `formatted amount`, `locale` and `currency`, returns the numeric value it corresponds to.*/
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
