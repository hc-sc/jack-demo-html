// Get dom objects for calculator buttons and screen
var buttons = document.body.querySelectorAll('.buttons > button');
var output = document.querySelector('.window');
// Assigned variables
var operator = ['×', '÷', '-', '+', '%'];
var input = '';
var dotFlag = false;
var result = false;
var oversize = false;
var size = 0;
var equation = '';
var result = '';

//Initiate event listener for all buttons objects
for (var i = 0; i < buttons.length; i++) {
 buttons[i].onclick = function(e) {
  var btnText = this.innerHTML;
  var size = output.innerHTML.length;
  if(size > 8){
    oversize = true;
  }else{
    oversize = false;
  }
  if ((input == '0' && btnText != '.' && operator.indexOf(btnText) == -1 ) || input == 'NaN' || (result && operator.indexOf(btnText) == -1)) {
     result = false;
     input ='';
  }
  if (btnText === 'AC') {
   clearAC();
  } else if (btnText === 'CE') {
   input = clearCE(input.length);
  } else if (btnText === '.' && !oversize) {
   if (input.indexOf('.') === -1 || dotFlag) {
    input += '.';
    dotFlag = false;
   }
  } else if (btnText === '=') {
    result = true;
   input = calc.calculate(input);
  } else {
    if(!oversize){
      result = false;
      input += btnText;
    }
  }
   try {
     print(input, oversize);
   }catch(e){
     console.log(e);
     return 'NaN';
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

function print(input, oversize){
  if(oversize){
    throw "this number is too large";
  }else {
    output.innerHTML = input;
  }
}

let calc = {};

calc.calculate = function(sequence) {
 equation = sequence.replace(/×/g, '*');
 equation = equation.replace(/÷/g, '/');

 try {
  var equal = Math.round(eval(equation) * 100) / 100;
   return equal;
 } catch (error) {
   console.log(error);
    return 'NaN';
 }
}
module.exports=calc;
