function calc_function(e) {
  var x = document.getElementById('output').innerHTML;
  var l = x.length;
  var buttonType = e.target.className;
  if (x == "NaN" && buttonType !== "big_button clear") {
    return;
  }
  if (buttonType == "small_button number" && x == '0') {
   document.getElementById('output').innerHTML = e.target.innerHTML;
  }
  if (buttonType == "small_button number" && x !== '0') {
   document.getElementById('output').innerHTML = x + e.target.innerHTML;
  }
  if (buttonType == "big_button clear") {
   document.getElementById('output').innerHTML = '0';
  }
  if (buttonType == "small_button minus" && isNaN(x[l-1])===false) {
   document.getElementById('output').innerHTML = -x;
  }
  if (buttonType == "small_button minus" && x == '0') {
   document.getElementById('output').innerHTML = '-';
  }
   if (buttonType == "small_button minus" && isNaN(x[l-1])===true) {
   document.getElementById('output').innerHTML = x + '-';
  }
  if (buttonType == "small_button decimal") {
    if ((/\./g.test(x) === true && /([-+x÷]{1,1}[0-9]*)$/.test(x) === true)) {
       document.getElementById('output').innerHTML = x + '.' ;
     }
     else if (/\./g.test(x) === false) {
       document.getElementById('output').innerHTML = x + '.' ;
     }
  }
  if (buttonType == "small_button operator" && (e.target.innerHTML == '+' || e.target.innerHTML == '-') && isNaN(x[l-1])===false) {
  document.getElementById('output').innerHTML = x + e.target.innerHTML;
 }
 if (buttonType == "small_button operator" && e.target.innerHTML == 'x' && isNaN(x[l-1])===false) {
   document.getElementById('output').innerHTML = x + '*';
 }
 if (buttonType == "small_button operator" && e.target.innerHTML == '÷' && isNaN(x[l-1])===false) {
   document.getElementById('output').innerHTML = x + '/';
 }
 if (buttonType == "big_button operator") {
   var y = eval(x);
   document.getElementById('output').innerHTML = Number(Math.round(y+'e2')+'e-2');
  }
}

document.addEventListener("click", calc_function);