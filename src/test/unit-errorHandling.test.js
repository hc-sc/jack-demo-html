const { calculate, errorHandling } = require('../calc-assets/calc.js');

describe('Checking if all errors will be handled', () => {
	test('inputing values as soon as the page loads', () => {
		expect(errorHandling('1', '0', true)).toBe('');
		expect(errorHandling('+', '0', true)).toBe('');
		expect(errorHandling('-', '0', true)).toBe('');
	});

	test('using the calc after an error is displayed', () => {
		expect(errorHandling('.', 'Lrg', false)).toBe('');
		expect(errorHandling('+', 'Err', false)).toBe('');
		expect(errorHandling('1', 'Err', false)).toBe('');
		expect(errorHandling('1', 'Lrg', false)).toBe('');
	});
	test('erase the previous answer if the user doesnt input an operator', () => {
		var num = calculate('1+1');
		expect(errorHandling('1', num, false)).toBe('');
		var num2 = calculate('1+1');
		expect(errorHandling('+', num2, false)).toBe(num2);
	});

	test('no errors to handle', () => {
		expect(errorHandling('+', '1', false)).toBe('1');
		expect(errorHandling('=', '12+1', false)).toBe('');
	});
});

describe('thrown errors from calculate function', () => {
	test('throw a wrong formating error', () => {
		expect(calculate('90*')).toBe('Err');
		expect(calculate('x+4')).toBe('Err');
		expect(calculate('*')).toBe('Err');
		expect(calculate('+')).toBe('Err');
		expect(calculate('-')).toBe('Err');
		expect(calculate('hi')).toBe('Err');
	});
	test('thow a large number error', () => {
		expect(calculate('999999999999*999999')).toBe('Lrg');
		expect(calculate('88888888888888*999999')).toBe('Lrg');
		expect(calculate('888888888887777+999999')).toBe('Lrg');
		expect(calculate('999999999999999999999999')).toBe('Lrg');
	});
});
