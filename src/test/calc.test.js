var assert = require('assert');
var calc = require('../../dist/calc.min.js');

describe('Calculator Tests', function() {

	it('returns 1+1=2', function(done) {
		assert.equal(calc.calculate("1+1"), 2);
		done();
		});
	it('returns 6-4=2', function(done) {
		assert.equal(calc.calculate("6-4"), 2);
		done();
		});
	it('returns 2*2=4', function(done) {
		assert.equal(calc.calculate("2*2"), 4);
		done();
		});
	it('returns 4/2=2', function(done) {
		assert.equal(calc.calculate("4/2"), 2);
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
