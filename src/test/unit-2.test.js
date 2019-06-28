const {
	calculate
} = require('../calc-assets/calc.js');


describe('Testing calculator functions', () => {
	// regular operations
	test('2 number addition', () => {
		expect(calculate('1+1')).toBeCloseTo(2, 5)
		expect(calculate('6+4')).toBeCloseTo(10, 5)
		expect(calculate('2+2')).toBeCloseTo(4, 5)
		expect(calculate('4+2')).toBeCloseTo(6, 5)
		expect(calculate('20+60')).toBeCloseTo(80, 5)
	})
	test('2 number subtraction', () => {
		expect(calculate('1-1')).toBeCloseTo(0, 5)
		expect(calculate('6-4')).toBeCloseTo(2, 5)
		expect(calculate('2-2')).toBeCloseTo(0, 5)
		expect(calculate('4-2')).toBeCloseTo(2, 5)
		expect(calculate('20-60')).toBeCloseTo(-40, 5)
	})
	test('2 number multiplication', () => {
		expect(calculate('1*1')).toBeCloseTo(1, 5)
		expect(calculate('6*4')).toBeCloseTo(24, 5)
		expect(calculate('2*2')).toBeCloseTo(4, 5)
		expect(calculate('4*2')).toBeCloseTo(8, 5)
		expect(calculate('20*60')).toBeCloseTo(1200, 5)
	})
	test('2 number division', () => {
		expect(calculate('1/1')).toBeCloseTo(1, 5)
		expect(calculate('0/2')).toBeCloseTo(0, 5)
		expect(calculate('2/0')).toBe(Infinity)
		expect(calculate('4/2')).toBeCloseTo(2, 5)
		expect(calculate('60/20')).toBeCloseTo(3, 5)
	})

	test('2 number negation', () => {
		expect(calculate('-1+1')).toBeCloseTo(0, 5)
		expect(calculate('-6-4')).toBeCloseTo(-10, 5)
		expect(calculate('-2*2')).toBeCloseTo(-4, 5)
		expect(calculate('-4/2')).toBeCloseTo(-2, 5)
		expect(calculate('-2+2')).toBeCloseTo(0, 5)
	})

	// Decimal
	test('decimal addition', () => {
		expect(calculate('1.9+1.1')).toBeCloseTo(3, 5)
		expect(calculate('6.7+4.2')).toBeCloseTo(10.9, 5)
		expect(calculate('2.1+2.8')).toBeCloseTo(4.9, 5)
		expect(calculate('4.6+2.3')).toBeCloseTo(6.9, 5)
		expect(calculate('-2+2.2')).toBeCloseTo(0.2, 5)
	})
	test('decimal subtraction', () => {
		expect(calculate('1.9-1.1')).toBeCloseTo(0.8, 5)
		expect(calculate('6.7-4.2')).toBeCloseTo(2.5, 5)
		expect(calculate('2.1-2.8')).toBeCloseTo(-0.7, 5)
		expect(calculate('4.6-2.3')).toBeCloseTo(2.3, 5)
		expect(calculate('-2-2.2')).toBeCloseTo(-4.2, 5)
	})
	test('decimal multiplication', () => {
		expect(calculate('1.9*1.1')).toBeCloseTo(2.09, 5)
		expect(calculate('6.7*4.2')).toBeCloseTo(28.14, 5)
		expect(calculate('2.1*2.8')).toBeCloseTo(5.88, 5)
		expect(calculate('-4.6*-2.3')).toBeCloseTo(10.58, 5)
		expect(calculate('-2*2.2')).toBeCloseTo(-4.4, 5)
	})
	test('decimal division', () => {
		expect(calculate('1.9/1.1')).toBeCloseTo(1.73, 5)
		expect(calculate('6.7/4.2')).toBeCloseTo(1.6, 5)
		expect(calculate('2.1/2.8')).toBeCloseTo(0.75, 5)
		expect(calculate('4.6/2.3')).toBeCloseTo(2, 5)
		expect(calculate('-2/2.2')).toBeCloseTo(-0.91, 5)
	})
	test('decimal negation', () => {
		expect(calculate('-1.9+1.1')).toBeCloseTo(-0.8, 5)
		expect(calculate('-6.7-4.2')).toBeCloseTo(-10.9, 5)
		expect(calculate('-2.1*-2.8')).toBeCloseTo(5.88, 5)
		expect(calculate('-4.6/2.3')).toBeCloseTo(-2, 5)
		expect(calculate('-2+2.2')).toBeCloseTo(0.2, 5)
	})
})

describe('thrown errors from calculate function', () => {
	test('throw a wrong formating error', () => {
		expect(calculate('90*')).toBe('Err')
		expect(calculate('x+4')).toBe('Err')
		expect(calculate('*')).toBe('Err')
		expect(calculate('+')).toBe('Err')
		expect(calculate('-')).toBe('Err')
		expect(calculate('hi')).toBe('Err')
	})
	test('thow a large number error', () => {
		expect(calculate('999999999999*999999')).toBe('Lrg')
		expect(calculate('88888888888888*999999')).toBe('Lrg')
		expect(calculate('888888888887777+999999')).toBe('Lrg')
		expect(calculate('999999999999999999999999')).toBe('Lrg')
	})
})

