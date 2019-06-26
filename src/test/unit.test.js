const {
	calculate,
	clearAC,
	clearCE,
	calculator,
	errorHandling
} = require('../calc-assets/calc.js');

describe('Testing calculator functions', () => {	
  test('2 number calculation', () => {
		expect(calculate("1+1")).toEqual(2)
		expect(calculate("6-4")).toEqual(2)
		expect(calculate("2*2")).toEqual(4)
		expect(calculate("4/2")).toEqual(2)
		expect(calculate("-2+2")).toEqual(0)
  })    
  test('decimal calculation', () => {
		expect(calculate("1.9+1.1")).toEqual(3)
		expect(calculate("6.7-4.2")).toEqual(2.5)
		expect(calculate("2.1*2.8")).toEqual(5.88)
		expect(calculate("4.6/2.3")).toEqual(2)
		expect(calculate("-2+2.2")).toEqual(0.2)
  })    
})


describe('clear one element', () => {	
  test('clear one number', () => {
		expect(clearCE(6, "123456")).toEqual("12345")
  })    
  test('clearing one out of one elements', () => {
		expect(clearCE(1, "9")).toEqual("0")
  })    
  test('clearing an operator', () => {
		expect(clearCE(2, "9+")).toEqual("9")
  })  
})

describe('clear All', () => {	
  test('clearing all elements', () => {
		expect(clearAC("123456")).toEqual(0)
		expect(clearAC("9")).toEqual(0)
		expect(clearAC("0")).toEqual(0)
  })  
})

describe('Checking for error thrown by the calculate function', () => {	
  test('returns error for number larger than 8', () => {
		expect(calculate("999999999999*999999")).toEqual("Lrg")
  })  
  
  test('returns error for missing operator (90*)', () => {
		expect(calculate("90*")).toEqual("Err")
  })  
  
  test('eturns error for letter in equation', () => {	
		expect(calculate("x+4")).toEqual("Err")
  })
})

describe('Calculator function', () => {
  test('check return after entering a number', () => {
		expect(calculator("1",0,"")).toEqual("1")
		expect(calculator("2",0,"")).toEqual("2")
		expect(calculator("3",0,"")).toEqual("3")
		expect(calculator("4",0,"")).toEqual("4")
		expect(calculator("5",0,"")).toEqual("5")
		expect(calculator("6",0,"")).toEqual("6")
		expect(calculator("7",0,"")).toEqual("7")
		expect(calculator("8",0,"")).toEqual("8")
		expect(calculator("9",0,"")).toEqual("9")
		expect(calculator(".",0,"")).toEqual(".")
		expect(calculator("-",0,"")).toEqual("-")
		expect(calculator("+",0,"")).toEqual("+")		
		expect(calculator("AC",3,"123")).toEqual("0")
		expect(calculator("CE",3,"123")).toEqual("12")
		expect(calculator("CE",1,"1")).toEqual("0")
  })  
  
  test('Checking if the calculation is preformed', () => {
		expect(calculator("=",3,"1+1")).toEqual("2")
		expect(calculator("=",3,"6-4")).toEqual("2")
		expect(calculator("=",3,"2*2")).toEqual("4")
		expect(calculator("=",3,"4/2")).toEqual("2")
		expect(calculator("=",3,"-2+2")).toEqual("0")
		expect(calculator("=",2,".2")).toEqual("0.2")
		expect(calculator("=",3,"2.0")).toEqual("2")
  })  
  
  test('checking for errors', () => {	
		expect(calculator("=",4,"1..2")).toEqual("Err")
		expect(calculator("=",5,"1.2.3")).toEqual("Err")
		expect(calculator("=",3,"..2")).toEqual("Err")
		expect(calculator("=",5,"..2+2")).toEqual("Err")
		expect(calculator("=",9,"9*9999999")).toEqual("Lrg")
  })
})

describe('Checking if all errors will be handled', () => {	
  test('inputing values as soon as the page loads', () => {
    expect(errorHandling("1","0")).toEqual('')
	//This happens in the case the user wants to input a negative int
    expect(errorHandling("+","0")).toEqual('0')
    expect(errorHandling("-","0")).toEqual('0')
  })  
  
  test('using the calc after an error is displayed', () => {
	  expect(errorHandling(".","Lrg")).toEqual('')
	  expect(errorHandling("+","Err")).toEqual('')
	  expect(errorHandling("1","Err")).toEqual('')
	  expect(errorHandling("1","Lrg")).toEqual('')
  })  
  
  /**
	Tests to be implemented: 
		- check if the result will be earsed after the user hits equal 
		- check if the user will be able to cont with the previous answer if they hit an operator 
	**/
  test('erase the previous answer if the user doesnt input an operator', () => {
    expect(errorHandling("1","0")).toEqual('')
  })  
  
  test('no errors to handle', () => {	
    expect(errorHandling("+","1")).toEqual('1')
    expect(errorHandling("=","12+1")).toEqual('12+1')
  })
})










