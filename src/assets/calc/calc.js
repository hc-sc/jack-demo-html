// Get dom objects for calculator buttons and screen
var buttons = document.body.querySelectorAll('.buttons > button');
var output = document.querySelector('.window');
// Assigned variables
var operator = ['×', '÷', '-', '+', '%'];
var input = '';
var dotFlag = false;
var result = false;
var equation = '';
var result = '';

//Initiate event listener for all buttons objects
for (var i = 0; i < buttons.length; i++) {
 buttons[i].onclick = function(e) {
  var btnText = this.innerHTML;
   // Takes care of the extra zero from AC and CE
  if ((input == '0' && btnText != '.' && operator.indexOf(btnText) == -1 ) || input == 'NaN' || (result && operator.indexOf(btnText) == -1)) {
     result = false;
     input ='';
  }

  if (btnText === 'AC') {
   clearAC();

  } else if (btnText === 'CE') {

   input = clearCE(input.length);

  } else if (btnText === '.') {
   if (input.indexOf('.') === -1 || dotFlag) {
    input += '.';
    dotFlag = false;
   }
  } else if (btnText === '=') {
    result = true;
   input = calc.calculate(input);
  } else {
     result = false;
    input += btnText;
  }
  output.innerHTML = input;
 }
}


function clearAC() {
 input = 0;
 operatorFlag = false;
 equation = '';
}

function clearCE(length) {
 if (length > 1) {
  return input.slice(0, input.length - 1);
 }
 return 0;
}

let calc = {};

calc.calculate = function calculate(sequence) {
 equation = sequence.replace(/×/g, '*');
 equation = equation.replace(/÷/g, '/');

 try {
  return Math.round(eval(equation) * 1000000) / 1000000;
 } catch (error) {
  return 'NaN';
 }
}
module.exports=calc;
