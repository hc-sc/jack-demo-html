var buttons = document.body.querySelectorAll('.buttons > button');
var output = document.querySelector('.window');
const operator = ['×', '÷', '-', '+', '%'];
var equation = '';
var result = false;
var size = 0;
var beg = true;

for (var i = 0; i < buttons.length; i++) {
	buttons[i].onclick = button;
}

function button(e) {
	var btnText = this.innerHTML;
	var size = output.innerHTML.length;
	if (size == 0) beg = true;
	var input = output.innerHTML;
	input = errorHandling(btnText, input, beg);
	output.innerHTML = calculator(btnText, size, input);
}

function calculator(textButton, size, input) {
	var oversize = false;
	if (size > 8) {
		oversize = true;
	}
	if (textButton === 'AC') {
		input = clearAC(input);
	} else if (textButton === 'CE') {
		input = clearCE(input.length, input);
	} else if (textButton === '.' && !oversize) {
		beg = false;
		input += '.';
	} else if (textButton === '=') {
		beg = false;
		input = calculate(input);
	} else if (!oversize) {
		beg = false;
		result = false;
		input += textButton;
	}
	return String(input);
}

function errorHandling(textButton, input, beg) {
	if (
		(input == '0' && textButton != '.' && beg) ||
		(result && operator.indexOf(textButton) == -1) ||
		(input == 'Err' || input == 'Lrg')
	) {
		size = 0;
		result = false;
		input = '';
		beg = false;
	}
	return input;
}

function clearAC(input) {
	beg = true;
	equation = '';
	return '0';
}

function clearCE(length, input) {
	if (length > 1) {
		return input.slice(0, input.length - 1);
	}
	beg = true;
	return '0';
}

function calculate(sequence) {
	var newVal = evalute(sequence);
	try {
		var equal = newVal;
		if (equal.length > 9) {
			result = false;
			return 'Lrg';
		} else {
			result = true;
			beg = false;
			return equal;
		}
	} catch (error) {
		result = false;
		return 'Err';
	}
}

function evalute(num) {
	equation = num.replace(/×/g, '*');
	equation = num.replace(/÷/g, '/');
	var newVal = Number(equation);
	newVal = Math.round(newVal * 100) / 100;
	return newVal;
}

module.exports = {
	calculate,
	clearAC,
	clearCE,
	calculator,
	errorHandling,
	evalute
};
