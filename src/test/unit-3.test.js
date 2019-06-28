const {
	clearAC,
	clearCE,
	calculate
} = require('../calc-assets/calc.js');

describe('clear one element', () => {
	test('clear one charcter', () => {
		expect(clearCE(6, '123456')).toBe('12345')
		expect(clearCE(5, '56+67')).toBe('56+6')
		expect(clearCE(4, '12.3')).toBe('12.')
		expect(clearCE(3, '12.')).toBe('12')
		expect(clearCE(1, '9')).toBe('0')
	})
	test('clearing an operator', () => {
		expect(clearCE(2, '9+')).toBe('9')
		expect(clearCE(1, '.')).toBe('0')
		expect(clearCE(2, '-9')).toBe('-')
		expect(clearCE(1, '-')).toBe('0')
	})
	test('check for multiple clears back to back', () => {
		var cl = clearCE(3, '123')
		var cl = clearCE(2, cl)
		expect(clearCE(1, cl)).toBe('0')
	})
})

describe('clear All', () => {
	test('clearing input', () => {
		expect(clearAC('123456')).toBe('0')
		expect(clearAC('9')).toBe('0')
		expect(clearAC('0')).toBe('0')
	})
	test('clearing equation', () => {
		expect(clearAC('12+3')).toBe('0')
		expect(clearAC('5/6')).toBe('0')
		expect(clearAC('0+0')).toBe('0')
	})
	test('clearing result', () => {
		var calc = calculate('12+3')
		expect(clearAC(calc)).toBe('0')
	})
})