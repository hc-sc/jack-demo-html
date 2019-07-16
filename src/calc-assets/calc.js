var buttons = document.body.querySelectorAll('.buttons > button');
var output = document.querySelector('.window');
const operator = ['×', '÷', '-', '+', '%'];
var equation = '';
var result = false;
var size = 0;
var beg = true;

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function(e) {
    var btnText = this.innerHTML;
    var size = output.innerHTML.length;
    if (size == 0) beg = true;
    var input = output.innerHTML;
    input = errorHandling(btnText, input, beg);
    output.innerHTML = calculator(btnText, size, input);
  };
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
  if (input == '0' && textButton != '.' && beg) {
    size = 0;
    result = false;
    input = '';
    beg = false;
  } else if (result && operator.indexOf(textButton) == -1) {
    size = 0;
    result = false;
    input = '';
    beg = false;
  } else if (input == 'Err' || input == 'Lrg') {
    size = 0;
    result = false;
    input = '';
    beg = false;
  }
  return input;
}

function clearAC(input) {
  operatorFlag = false;
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
  equation = sequence.replace(/×/g, '*');
  equation = equation.replace(/÷/g, '/');
  try {
    var equal = Math.round(eval(equation) * 100) / 100;
    if (equation.length > 9) {
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

module.exports = {
  calculate,
  clearAC,
  clearCE,
  calculator,
  errorHandling
};
