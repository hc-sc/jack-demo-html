var buttons = document.body.querySelectorAll('.buttons > button');
var output = document.querySelector('.window');
var operator = ['×', '÷', '-', '+', '%'];
var input = '';
var result = false;
var oversize = false;
var size;
var equation = '';

for (var i = 0; i < buttons.length; i++) {
	buttons[i].onclick = function(e) {
		var btnText = this.innerHTML;
		size = output.innerHTML.length;
		errorHandling(btnText, size, output.innerHTML);
		output.innerHTML = calculator(btnText, size, output.innerHTML);
	}
}

function calculator(textButton, size, innerText){
	if (size > 8) {
		oversize = true;
	} else {
		oversize = false;
	}
	
	if (textButton === 'AC') {
		input = clearAC(input);
	} else if (textButton === 'CE') {
		input = clearCE(input.length, input);
	} else if (textButton === '.' && !oversize) {
			input += '.';
	} else if (textButton === '=') {
		result = true;
		input = calculate(input);
	} else {
		if (!oversize) {
			result = false;
			input += textButton;
		}
	}
	return input;
}

function errorHandling(textButton, size, innerText){
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
		if (equation.length > 8) {
			return 'Lrg';
		} else {
			return equal;
		}
	} catch (error) {
		return 'Err';
	}
}

module.exports = {
	calculate,
	clearAC,
	clearCE,
	calculator
}