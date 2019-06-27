const {
	calculate,
	clearAC,
	clearCE,
	calculator,
	errorHandling
} = require('../calc-assets/calc.js');

describe('Testing calculator functions', () => {	
// regular operations
  test('2 number addition', () => {
		expect(calculate('1+1')).toBeCloseTo(2,5)
		expect(calculate('6+4')).toBeCloseTo(10,5)
		expect(calculate('2+2')).toBeCloseTo(4,5)
		expect(calculate('4+2')).toBeCloseTo(6,5)
		expect(calculate('20+60')).toBeCloseTo(80,5)
  }) 
  test('2 number subtraction', () => {
		expect(calculate('1-1')).toBeCloseTo(0,5)
		expect(calculate('6-4')).toBeCloseTo(2,5)
		expect(calculate('2-2')).toBeCloseTo(0,5)
		expect(calculate('4-2')).toBeCloseTo(2,5)
		expect(calculate('20-60')).toBeCloseTo(-40,5)
  }) 
  test('2 number multiplication', () => {
		expect(calculate('1*1')).toBeCloseTo(1,5)
		expect(calculate('6*4')).toBeCloseTo(24,5)
		expect(calculate('2*2')).toBeCloseTo(4,5)
		expect(calculate('4*2')).toBeCloseTo(8,5)
		expect(calculate('20*60')).toBeCloseTo(1200,5)
  })   
  test('2 number division', () => {
		expect(calculate('1/1')).toBeCloseTo(1,5)
		expect(calculate('0/2')).toBeCloseTo(0,5)
		expect(calculate('2/0')).toBe(Infinity)
		expect(calculate('4/2')).toBeCloseTo(2,5)
		expect(calculate('60/20')).toBeCloseTo(3,5)
  })   
  
  test('2 number negation', () => {
		expect(calculate('-1+1')).toBeCloseTo(0,5)
		expect(calculate('-6-4')).toBeCloseTo(-10,5)
		expect(calculate('-2*2')).toBeCloseTo(-4,5)
		expect(calculate('-4/2')).toBeCloseTo(-2,5)
		expect(calculate('-2+2')).toBeCloseTo(0,5)
  }) 

// Decimal
  test('decimal addition', () => {
		expect(calculate('1.9+1.1')).toBeCloseTo(3,5)
		expect(calculate('6.7+4.2')).toBeCloseTo(10.9,5)
		expect(calculate('2.1+2.8')).toBeCloseTo(4.9,5)
		expect(calculate('4.6+2.3')).toBeCloseTo(6.9,5)
		expect(calculate('-2+2.2')).toBeCloseTo(0.2,5)
  })  
  test('decimal subtraction', () => {
		expect(calculate('1.9-1.1')).toBeCloseTo(0.8,5)
		expect(calculate('6.7-4.2')).toBeCloseTo(2.5,5)
		expect(calculate('2.1-2.8')).toBeCloseTo(-0.7,5)
		expect(calculate('4.6-2.3')).toBeCloseTo(2.3,5)
		expect(calculate('-2-2.2')).toBeCloseTo(-4.2,5)
  })  
  test('decimal multiplication', () => {
		expect(calculate('1.9*1.1')).toBeCloseTo(2.09,5)
		expect(calculate('6.7*4.2')).toBeCloseTo(28.14,5)
		expect(calculate('2.1*2.8')).toBeCloseTo(5.88,5)
		expect(calculate('-4.6*-2.3')).toBeCloseTo(10.58,5)
		expect(calculate('-2*2.2')).toBeCloseTo(-4.4,5)
  })  
  test('decimal division', () => {
		expect(calculate('1.9/1.1')).toBeCloseTo(1.73,5)
		expect(calculate('6.7/4.2')).toBeCloseTo(1.6,5)
		expect(calculate('2.1/2.8')).toBeCloseTo(0.75,5)
		expect(calculate('4.6/2.3')).toBeCloseTo(2,5)
		expect(calculate('-2/2.2')).toBeCloseTo(-0.91,5)
  })  
  test('decimal negation', () => {
		expect(calculate('-1.9+1.1')).toBeCloseTo(-0.8,5)
		expect(calculate('-6.7-4.2')).toBeCloseTo(-10.9,5)
		expect(calculate('-2.1*-2.8')).toBeCloseTo(5.88,5)
		expect(calculate('-4.6/2.3')).toBeCloseTo(-2,5)
		expect(calculate('-2+2.2')).toBeCloseTo(0.2,5)
  })  
})


describe('clear one element', () => {	
  test('clear one number', () => {
		expect(clearCE(6, '123456')).toBe('12345')
  })    
  test('clearing one out of one elements', () => {
		expect(clearCE(1, '9')).toBe('0')
  })    
  test('clearing an operator', () => {
		expect(clearCE(2, '9+')).toBe('9')
  })  
})

describe('clear All', () => {	
  test('clearing all elements', () => {
		expect(clearAC('123456')).toBe('0')
		expect(clearAC('9')).toBe('0')
		expect(clearAC('0')).toBe('0')
  })  
})

describe('Checking for error thrown by the calculate function', () => {	
  test('returning the correct errors', () => {
	expect(calculate('999999999999*999999')).toBe('Lrg')
	expect(calculate('90*')).toBe('Err')
	expect(calculate('x+4')).toBe('Err')
	})
})
describe('Calculator function', () => {
  test('check return after entering a number', () => {
		expect(calculator('1',0,'')).toBe('1')
		expect(calculator('2',0,'')).toBe('2')
		expect(calculator('3',0,'')).toBe('3')
		expect(calculator('4',0,'')).toBe('4')
		expect(calculator('5',0,'')).toBe('5')
		expect(calculator('6',0,'')).toBe('6')
		expect(calculator('7',0,'')).toBe('7')
		expect(calculator('8',0,'')).toBe('8')
		expect(calculator('9',0,'')).toBe('9')
		expect(calculator('.',0,'')).toBe('.')
		expect(calculator('-',0,'')).toBe('-')
		expect(calculator('+',0,'')).toBe('+')		
		expect(calculator('AC',3,'123')).toBe('0')
		expect(calculator('CE',3,'123')).toBe('12')
		expect(calculator('CE',1,'1')).toBe('0')
  })  
  
  test('Checking if the calculation is preformed', () => {
		expect(calculator('=',3,'1+1')).toBe('2')
		expect(calculator('=',3,'6-4')).toBe('2')
		expect(calculator('=',3,'2*2')).toBe('4')
		expect(calculator('=',3,'4/2')).toBe('2')
		expect(calculator('=',3,'-2+2')).toBe('0')
		expect(calculator('=',2,'.2')).toBe('0.2')
		expect(calculator('=',3,'2.0')).toBe('2')
  })  
  
  test('checking for errors', () => {	
		expect(calculator('=',4,'1..2')).toBe('Err')
		expect(calculator('=',5,'1.2.3')).toBe('Err')
		expect(calculator('=',3,'..2')).toBe('Err')
		expect(calculator('=',5,'..2+2')).toBe('Err')
		expect(calculator('=',10,'9*99999999')).toBe('Lrg')
		expect(calculator('=',0,'')).toBe('NaN')
  })
})

describe('Checking if all errors will be handled', () => {	
  test('inputing values as soon as the page loads', () => {
    expect(errorHandling('1','0')).toBe('')
	
	//This happens in the case the user wants to input a negative int
    expect(errorHandling('+','0')).toBe('0')
    expect(errorHandling('-','0')).toBe('0')
  })  
  
  test('using the calc after an error is displayed', () => {
	  expect(errorHandling('.','Lrg')).toBe('')
	  expect(errorHandling('+','Err')).toBe('')
	  expect(errorHandling('1','Err')).toBe('')
	  expect(errorHandling('1','Lrg')).toBe('')

  })  
  
  /**
	Tests to be implemented: 
		- check if the result will be earsed after the user hits equal 
		- check if the user will be able to cont with the previous answer if they hit an operator 
	**/
  test('erase the previous answer if the user doesnt input an operator', () => {
    var num = calculate('1+1');
	expect(errorHandling('1',num)).toBe('')
	var num2 = calculate('1+1');
	expect(errorHandling('+',num2)).toBe(num2)
  })  
  
  test('no errors to handle', () => {	
    expect(errorHandling('+','1')).toBe('1')
    expect(errorHandling('=','12+1')).toBe('')
  })
})
