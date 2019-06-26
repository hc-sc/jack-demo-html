var buttons = document.body.querySelectorAll('.buttons > button');
var output = document.querySelector('.window');
var operator = ['×', '÷', '-', '+', '%'];
var equation = '';
var result = false;
var size = 0;

for (var i = 0; i < buttons.length; i++) {
	buttons[i].onclick = function(e) {
		var btnText = this.innerHTML;
		var size = output.innerHTML.length;
		var input = output.innerHTML;
		input = errorHandling(btnText, input);
		output.innerHTML = calculator(btnText, size, input);
	}
}

function calculator(textButton, size, input){
	var oversize = false;
	if (size > 8) {
		oversize = true;
	}
	if (textButton === 'AC') {
		input = clearAC(input);
	} else if (textButton === 'CE') {
		input = clearCE(input.length, input);
	} else if (textButton === '.' && !oversize) {
			input += '.';
	} else if (textButton === '=') {
		input = calculate(input);
	} else {
		if (!oversize) {
			result = false;
			input += textButton;
		}
	}
	return input;
}

function errorHandling(textButton, input){
	if (input == '0' && textButton != '.' && operator.indexOf(textButton) == -1){
		size = 0;
		result = false;
		input = '';
	}else if (input == 'Err' || input == 'Lrg'){
		size = 0;
		result = false;
		input = '';
	}else if(result && operator.indexOf(textButton) == -1){
		size = 0;			
		result = false;
		input = '';
	}
	return input;	
}

function clearAC(input) {
	operatorFlag = false;
	equation = '';
	return '0';
}

function clearCE(length, input) {
	if (length > 1) {
		return input.slice(0, input.length - 1);
	}
	return '0';
}

function calculate(sequence) {
	equation = sequence.replace(/×/g, '*');
	equation = equation.replace(/÷/g, '/');
	try {
		var equal = Math.round(eval(equation) * 100) / 100;
		if (equation.length > 8) {
			result = false;
			return 'Lrg';
		} else {
			result = true;
			return equal;
		}
	} catch (error) {
		result = false;
		return 'Err';
	}
}

module.exports = {
	calculate,
	clearAC,
	clearCE,
	calculator,
	errorHandling
}