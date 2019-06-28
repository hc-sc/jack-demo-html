const {
	calculate,
	calculator,
	errorHandling
} = require('../calc-assets/calc.js');

describe('Calculator function', () => {
	test('check return after entering a number', () => {
		expect(calculator('1', 0, '')).toBe('1')
		expect(calculator('2', 0, '')).toBe('2')
		expect(calculator('3', 0, '')).toBe('3')
		expect(calculator('4', 0, '')).toBe('4')
		expect(calculator('5', 0, '')).toBe('5')
		expect(calculator('6', 0, '')).toBe('6')
		expect(calculator('7', 0, '')).toBe('7')
		expect(calculator('8', 0, '')).toBe('8')
		expect(calculator('9', 0, '')).toBe('9')
		expect(calculator('.', 0, '')).toBe('.')
		expect(calculator('-', 0, '')).toBe('-')
		expect(calculator('+', 0, '')).toBe('+')
		expect(calculator('AC', 3, '123')).toBe('0')
		expect(calculator('CE', 3, '123')).toBe('12')
		expect(calculator('CE', 1, '1')).toBe('0')
	})

	test('Checking if the calculation is preformed', () => {
		expect(calculator('=', 3, '1+1')).toBe('2')
		expect(calculator('=', 3, '6-4')).toBe('2')
		expect(calculator('=', 3, '2*2')).toBe('4')
		expect(calculator('=', 3, '4/2')).toBe('2')
		expect(calculator('=', 3, '-2+2')).toBe('0')
		expect(calculator('=', 2, '.2')).toBe('0.2')
		expect(calculator('=', 3, '2.0')).toBe('2')
	})

	test('checking for errors', () => {
		expect(calculator('=', 4, '1..2')).toBe('Err')
		expect(calculator('=', 5, '1.2.3')).toBe('Err')
		expect(calculator('=', 3, '..2')).toBe('Err')
		expect(calculator('=', 5, '..2+2')).toBe('Err')
		expect(calculator('=', 10, '9*99999999')).toBe('Lrg')
		expect(calculator('=', 0, '')).toBe('NaN')
	})
})

// Need to be imrpoved
describe('Checking if all errors will be handled', () => {
	test('inputing values as soon as the page loads', () => {
		expect(errorHandling('1', '0', true)).toBe('')
		expect(errorHandling('+', '0', true)).toBe('')
		expect(errorHandling('-', '0', true)).toBe('')
	})

	test('using the calc after an error is displayed', () => {
		expect(errorHandling('.', 'Lrg', false)).toBe('')
		expect(errorHandling('+', 'Err', false)).toBe('')
		expect(errorHandling('1', 'Err', false)).toBe('')
		expect(errorHandling('1', 'Lrg', false)).toBe('')

	})
	test('erase the previous answer if the user doesnt input an operator', () => {
		var num = calculate('1+1');
		expect(errorHandling('1', num, false)).toBe('')
		var num2 = calculate('1+1');
		expect(errorHandling('+', num2, false)).toBe(num2)
	})

	test('no errors to handle', () => {
		expect(errorHandling('+', '1', false)).toBe('1')
		expect(errorHandling('=', '12+1', false)).toBe('')
	})
})