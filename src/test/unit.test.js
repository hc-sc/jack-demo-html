var assert = require('assert');
const {calculate, clearAC, clearCE} = require('../calc-assets/calc.js');

describe('Calculator Tests', function() {
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


describe('error handeling', function() {
	it('returns error for large numbers (999999999999*999999)', function(done){
		assert.equal(calculate("999999999999*999999"), "NumberTooLarge");
		done();
		});
	it('returns error for missing operator (90*)', function(done){
		assert.equal(calculate("90*"), "NaN");
		done();
		});
	it('returns error for letter in equation', function(done){
		assert.equal(calculate("x+4"), "NaN");
		done();
		});
});


