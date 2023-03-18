import { mask, unMask } from './'

test('should mask correctly', () => {
	const result = mask('123', '9.9.9')
	expect(result).toEqual('1.2.3')
})

test('should remove mask correctly', () => {
	const result = unMask(mask('123', '9.9.9'))
	expect(result).toEqual('123')
})

test('should use first mask', () => {
	const result = mask('123', ['9.9.9', '99-99'])
	expect(result).toEqual('1.2.3')
})

test('should use second mask', () => {
	const result = mask('1234', ['9.9.9', '99-99'])
	expect(result).toEqual('12-34')
})

test('should stop masking when char not match mask', () => {
	const result = mask('1234', '9-9.AA')
	expect(result).toEqual('1-2.')
})

test('should stop masking when char not match any multimask', () => {
	const result = mask('1234', ['9A-9', '9-9.AA'])
	expect(result).toEqual('1-2.')
})
