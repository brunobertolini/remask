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
