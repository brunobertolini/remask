import { toPattern } from 'vanilla-masker'

export const unMask = value => value.replace(/\W/g, '')

const masker = (value, pattern, options) =>
	toPattern(value, { pattern, ...options })

const multimasker = (value, patterns, options) =>
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
		? masker(value, pattern || '', options)
		: multimasker(value, pattern, options)
