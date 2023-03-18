interface PatternOptions {
	// Placeholder option to represent remaining characters to be entered
	placeholder?: string | undefined
}

interface RegExpMapProps {
	[key: string]: RegExp
}

const regexMap: RegExpMapProps = {
	9: new RegExp(/[0-9]/),
	A: new RegExp(/[a-zA-Z]/),
	S: new RegExp(/[0-9a-zA-Z]/),
}

export const unMask = (value: string) => value.replace(/\W/g, '')

export const masker = (
	value: string,
	pattern: string,
	options?: PatternOptions
) => {
	const patternCharList = pattern.split('')
	const unmaskedValue = unMask(String(value))
	const output = []

	let valueIndex = 0

	for (let i = 0; i < patternCharList.length; i++) {
		const patternChar = pattern[i]
		const valueChar = unmaskedValue[valueIndex]
		const regex = regexMap[patternChar]

		if (valueChar === patternChar) {
			output[i] = valueChar
			valueIndex++
			continue
		}

		if (!regex) {
			output[i] = patternChar
			continue
		}

		if (valueChar && regex.test(valueChar)) {
			output[i] = valueChar
			valueIndex++
			continue
		}

		if (options?.placeholder) {
			output[i] = options.placeholder
			continue
		}

		if (
			output.length < patternCharList.length &&
			/\W/.test(output[output.length - 1])
		) {
			output.pop()
		}

		break
	}

	return output.join('')
}

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
