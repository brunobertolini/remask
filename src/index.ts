import { toPattern } from 'vanilla-masker'
interface PatternOptions {
	// Pattern to mask value against.
	pattern?: string | undefined

	// Placeholder option to represent remaining characters to be entered
	placeholder?: string | undefined
}

export const unMask = (value: string) => value.replace(/\W/g, '')

const masker = (value: string, pattern: string, options?: PatternOptions) =>
	toPattern(value, { pattern, ...options })

const multimasker = (
	value: string,
	patterns: string[],
	options?: PatternOptions
) =>
	masker(
		value,
		patterns.reduce(
			(memo, pattern) => (value.length <= unMask(memo).length ? memo : pattern),
			patterns[0]
		),
		options
	)

export const mask = (
	value: string,
	pattern: string | string[],
	options?: PatternOptions
): string =>
	typeof pattern === 'string'
		? masker(value, pattern || '', options)
		: multimasker(value, pattern, options)
