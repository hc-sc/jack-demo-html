// Get dom objects for calculator buttons and screen
var buttons = document.body.querySelectorAll('.buttons > button');
var output = document.querySelector('.window');
// Assigned variables
var operator = ['×', '÷', '-', '+', '%'];
var input = '';
var dotFlag = false;
var result = false;
var oversize = false;
var size;
var equation = '';
var result = '';

for (var i = 0; i < buttons.length; i++) {
	buttons[i].onclick = function(e) {
		var btnText = this.innerHTML;
		var size = output.innerHTML.length;
		if (size > 9) {
			oversize = true;
		} else {
			oversize = false;
		}
		if ((input == '0' && btnText != '.' && operator.indexOf(btnText) == -1) || input == 'NaN' || (result && operator.indexOf(btnText) == -1)) {
			result = false;
			input = '';
		}
		if (btnText === 'AC') {
			input = clearAC(input);
		} else if (btnText === 'CE') {
			input = clearCE(input.length, input);
		} else if (btnText === '.' && !oversize) {
			if (input.indexOf('.') === -1 || dotFlag) {
				input += '.';
				dotFlag = false;
			}
		} else if (btnText === '=') {
			result = true;
			input = calculate(input);
		} else {
			if (!oversize) {
				result = false;
				input += btnText;
			}
		}
		output.innerHTML = input;
	}
}

function clearAC(input) {
	operatorFlag = false;
	equation = '';
	return 0;
}

function clearCE(length, input) {
	if (length > 1) {
		return input.slice(0, input.length - 1);
	}
	return 0;
}

function calculate(sequence) {
	equation = sequence.replace(/×/g, '*');
	equation = equation.replace(/÷/g, '/');
	try {
		var equal = Math.round(eval(equation) * 100) / 100;
		if (equal > 8) {
			return 'NumberTooLarge';
		} else {
			return equal;
		}
	} catch (error) {
		return 'NaN';
	}
}

module.exports = {
	calculate,
	clearAC,
	clearCE
}