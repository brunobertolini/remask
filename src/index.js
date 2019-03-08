import { toPattern } from 'vanilla-masker'

const intl = {
	fallback: {
		currency: 'BRL',
	},

	'pt-BR': {
		currency: 'BRL',
	},
}

const patterns = {
	currency: (
		value,
		{ language, ...options } = { language: window.navigator.language }
	) =>
		Number(
			parseFloat(value.indexOf('.') > -1 ? value : value / 100)
		).toLocaleString(language, {
			style: 'currency',
			currency: intl[language]
				? intl[language].currency
				: intl.fallback.currency,
			currencyDisplay: 'symbol',
			minimumFractionDigits: 2,
			...options,
		}),

	percent: value =>
		value &&
		`${parseFloat(value)
			.toFixed(2)
			.replace('.', ',')
			.replace(/(\d)(?=(\d{3})+,)/g, '$1.')} %`,
}

export const unMask = (value, pattern) =>
	pattern === 'currency' ? value.replace(/\D/g, '') : value.replace(/\W/g, '')

const masker = (value, pattern, options) =>
	toPattern(value, { pattern, ...options })

const maskChoose = (value, patterns, options) =>
	masker(
		value,
		patterns.reduce(
			(memo, pattern) => (value.length <= unMask(memo).length ? memo : pattern),
			patterns[0]
		),
		options
	)

export const mask = (value, pattern, options) =>
	typeof pattern === 'string'
		? patterns[pattern]
			? patterns[pattern](value || '', options)
			: masker(value, pattern || '', options)
		: maskChoose(value, pattern, options)
