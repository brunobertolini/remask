import { mask, unMask } from '.'

test('should mask correctly', () => {
	const result = mask('123', '9.9.9')
	expect(result).toEqual('1.2.3')
})

test('should mask correctly with alphanumeric chars', () => {
	const result = mask('ABC82739T', 'AAA-99.99/SS')
	expect(result).toEqual('ABC-82.73/9T')
})

test('should remove mask correctly', () => {
	const result = unMask(mask('123', '9.9.9'))
	expect(result).toEqual('123')
})

test('should apply placeholder', () => {
	const result = mask('AB3891', 'AA.99-99/SS.S', { placeholder: '_' })
	expect(result).toEqual('AB.38-91/__._')
})

test('should use first mask', () => {
	const result = mask('123', ['9.9.9', '99-99'])
	expect(result).toEqual('1.2.3')
})

test('should use second mask', () => {
	const result = mask('1234', ['9.9.9', '99-99'])
	expect(result).toEqual('12-34')
})

test('should stop masking when char not match mask and avoid ends with symbol', () => {
	const result = mask('1234', '9-9.AA')
	expect(result).toEqual('1-2')
})

test('should keep mask non pattern char on value', function () {
	expect(mask('+55 (48) 888-8', '+55 (99) 999-9999')).toEqual('+55 (48) 888-8')
})

test('should return empty value when pattern is empty', function () {
	expect(mask('+55 (48) 888-8', '')).toEqual('')
})
