var assert = require('assert');
const {
	calculate,
	clearAC,
	clearCE,
	calculator
} = require('../calc-assets/calc.js');

describe('calculations', function() {
	it('2 number calculation', function(done) {
		assert.equal(calculate("1+1"), 2);
		assert.equal(calculate("6-4"), 2);
		assert.equal(calculate("2*2"), 4);
		assert.equal(calculate("4/2"), 2);
		assert.equal(calculate("-2+2"), 0);
		done();
	});

	it('decimal calculation', function(done) {
		assert.equal(calculate("1.9+1.1"), 3);
		assert.equal(calculate("6.7-4.2"), 2.5);
		assert.equal(calculate("2.1*2.8"), 5.88);
		assert.equal(calculate("4.6/2.3"), 2);
		assert.equal(calculate("-2+2.2"), 0.2);
		done();
	});
});

describe('Clearing one element', function() {
	it('clear one element', function(done) {
		assert.equal(clearCE(6, "123456"), "12345");
		done();
	});
	it('clearing the last element', function(done) {
		assert.equal(clearCE(1, "9"), "0");
		done();
	});
	it('clearing an operator', function(done) {
		assert.equal(clearCE(2, "9+"), "9");
		done();
	});
});

describe('Clearing All', function() {
	it('clearing all elements', function(done) {
		assert.equal(clearAC("123456"), "0");
		done();
	});
	it('clearing ', function(done) {
		assert.equal(clearAC("9"), "0");
		done();
	});
});

describe('button input', function() {
	it('clearing all elements', function(done) {
		assert.equal(clearAC("123456"), "0");
		done();
	});
	it('clearing ', function(done) {
		assert.equal(clearAC("9"), "0");
		done();
	});
});
describe('Checking for error thrown by the calculate function', function() {
	it('returns error for number larger than 8', function(done) {
		assert.equal(calculate("999999999999*999999"), "Lrg");
		done();
	});
	it('returns error for missing operator (90*)', function(done) {
		assert.equal(calculate("90*"), "Err");
		done();
	});
	it('returns error for letter in equation', function(done) {
		assert.equal(calculate("x+4"), "Err");
		done();
	});
});

describe('Calculator function', function() {
	it('check return after entering 2', function(done) {
		assert.equal(calculator("1",0,""), "1");
		assert.equal(calculator("2",0,""), "2");
		assert.equal(calculator("3",0,""), "3");
		assert.equal(calculator("4",0,""), "4");
		assert.equal(calculator("5",0,""), "5");
		assert.equal(calculator("6",0,""), "6");
		assert.equal(calculator("7",0,""), "7");
		assert.equal(calculator("8",0,""), "8");
		assert.equal(calculator("9",0,""), "9");
		assert.equal(calculator(".",0,""), ".");
		assert.equal(calculator("-",0,""), "-");
		assert.equal(calculator("+",0,""), "+");		
		assert.equal(calculator("AC",3,"123"), "0");
		assert.equal(calculator("CE",3,"123"), "12");
		assert.equal(calculator("CE",1,"1"), "0");
		done();
	});
	
	it('Checking if the calculation is preformed', function(done) {
		assert.equal(calculator("=",3,"1+1"), "2");
		assert.equal(calculator("=",3,"6-4"), "2");
		assert.equal(calculator("=",3,"2*2"), "4");
		assert.equal(calculator("=",3,"4/2"), "2");
		assert.equal(calculator("=",3,"-2+2"), "0");
		assert.equal(calculator("=",2,".2"), "0.2");
		assert.equal(calculator("=",3,"2.0"), "2");
		done();
	});
	
	it('Checking for errors', function(done) {
		assert.equal(calculator("=",4,"1..2"), "Err");
		assert.equal(calculator("=",5,"1.2.3"), "Err");		
		assert.equal(calculator("=",3,"..2"), "Err");
		assert.equal(calculator("=",5,"..2+2"), "Err");
		assert.equal(calculator("=",3,"2+2"), "4");
		assert.equal(calculator("2",3,"4"), "");
		assert.equal(calculator("=",9,"9*9999999"), "Lrg");
		done();
	});
});