var assert = require('assert');
var calc = require('../assets/calc/calc.js');

describe('Calculator Tests', function() {

	it('Calculating 2 numbers', function(done) {
		assert.equal(calc.calculate("1+1"), 2);
    assert.equal(calc.calculate("6-4"), 2);
    assert.equal(calc.calculate("2*2"), 4);
    assert.equal(calc.calculate("4/2"), 2);
    assert.equal(calc.calculate("-2+2"), 0);
		done();
		});
});


describe('Error Tests', function() {
  it('returns error for large numbers (999999999999*999999)', function(done){
		assert.equal(calc.calculate("999999999999*999999"), "NaN");
		done();
		});
	it('returns error for missing operator (90*)', function(done){
		assert.equal(calc.calculate("90*"), "NaN");
		done();
		});
	it('returns error for letter in equation', function(done){
		assert.equal(calc.calculate("x+4"), "NaN");
		done();
		});
});
