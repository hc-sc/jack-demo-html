// calculator.js
// JavaScript handheld calculator made without libraries
// largely created to experience the pain to make libraries
// the pain was experienced
// I've rooted out a number of bugs but this spiralled out of control and surely some remain
// by Eric (Martin) Mancini, https://github.com/eqmvii

console.log("Script loaded!");

var app = {};

// get DOM nodes for buttons and screen
app.zero = document.getElementById('zero');
app.one = document.getElementById('one');
app.two = document.getElementById('two');
app.three = document.getElementById('three');
app.four = document.getElementById('four');
app.five = document.getElementById('five');
app.six = document.getElementById('six');
app.seven = document.getElementById('seven');
app.eight = document.getElementById('eight');
app.nine = document.getElementById('nine');
app.ac = document.getElementById('ac'); 
app.ce = document.getElementById('ce');
app.percent = document.getElementById('percent');
app.sign = document.getElementById('sign');
app.divide = document.getElementById('divide');
app.multiply = document.getElementById('multiply');
app.minus = document.getElementById('minus');
app.dot = document.getElementById('dot');
app.equals = document.getElementById('equals');
app.plus = document.getElementById('plus');

app.screen = document.getElementById('screen');

app.input = [];
app.display = "";

// array to store commands for when a user repeatedly presses equals
// mimicking the behavior of many hand calculators
app.equalsrepeat = [];

app.divflag = false;
app.lockout = false;

app.zero.addEventListener("click", function () {
    zeroFunc();
});

// special function for protecting against dividing by zero
var zeroFunc = function () {
    console.log(app.divflag);
    if (app.divflag)
    {
        app.lockout = true;
        updateScreen();
        return;        
    }
    else
    {
        numPress(0);
    }       
};

app.one.addEventListener("click", function () {
    numPress(1);
});

app.two.addEventListener("click", function () {
    numPress(2);
});

app.three.addEventListener("click", function () {
    numPress(3);
});

app.four.addEventListener("click", function () {
    numPress(4);
});

app.five.addEventListener("click", function () {
    numPress(5);
});

app.six.addEventListener("click", function () {
    numPress(6);
});

app.seven.addEventListener("click", function () {
    numPress(7);
});

app.eight.addEventListener("click", function () {
    numPress(8);
});

app.nine.addEventListener("click", function () {
    numPress(9);
});

var numPress = function (n) {
    app.lockout = false;
    app.divflag = false;
    if (app.input.length > 9)
    {
        restart();
        return;
    }
    if (app.equalsrepeat.length > 0 && !isOperator(app.input[app.input.length - 1]))
    {
        app.display = "" + n;
        app.input = [];
    }
    clearequalsrepeat();
    if (app.input.length === 0)
    {
        app.display = "" + n;
    }
    else if (typeof app.input[app.input.length - 1] !== "number" && app.input[app.input.length - 1] !== ".")
    {
        app.display = "" + n;
    }
    else
    {
        app.display += n; // append the character
    }
    app.input.push(n);
    updateScreen();

}

var addOperator = function (o) {
    console.log("Input before addOperator: " + app.input);
   
    clearequalsrepeat();
    if (operatorPressed() && typeof app.input[app.input.length - 1] === "number")
    {
        equalsign();
        app.input.push(o);
    }
    else if (typeof app.input[app.input.length - 1] !== "number")
    {
        app.input[app.input.length - 1] = o;
        
    }
    else
    {
        app.input.push(o);
    }

    console.log("Input after addOperator: " + app.input);
    
    
}

app.plus.addEventListener("click", function ()
{
    addOperator("+");    
});

app.multiply.addEventListener("click", function () {
    addOperator("x");
});

app.divide.addEventListener("click", function () {
    app.divflag = true;
    addOperator("/");
});

app.minus.addEventListener("click", function ()
{
    addOperator("m");
});

app.ac.addEventListener("click", function ()
{
    clearequalsrepeat();
    app.input = [];
    app.display = "0";
    updateScreen();
});

app.dot.addEventListener("click", function () {
    dotpress();
});

var dotpress = function () {
    // check to see if we just did a calc, if so, do nothing
    /*if (app.equalsrepeat.length > 0)
    {
        console.log("Can't add a dot after you just did an operation");
        return;
    }*/
    // check to see if last push was a dot, and if so, do nothing
    console.log("For debugging, here's typeof what was just pressed: ");
    console.log(typeof app.input[app.input.length - 1]);

    if (app.input.length >= 1 && app.input[app.input.length - 1] === ".")
    {
        return;
    }
    // clear input if we just did a calc
    
    else
    {
        if (app.input.length === 0 || typeof app.input[app.input.length - 1] !== "number" || app.equalsrepeat.length > 0)
        {
            // clearout the input if this is a fresh of repeated use of the decimal
            if (app.input.length === 0 || app.equalsrepeat.length > 0)
            {
                app.input = [];
            }
            console.log("Dot pressed and needs to be zero+");
            clearequalsrepeat();
            console.log("Either no input yet, or just finished an operation");
            app.input.push(0);
            app.display = "0";
        }
        app.input.push(".");
        app.display += ".";
        updateScreen();
        console.log(app.input);
    }

};

app.ce.addEventListener("click", function ()
{
    clearequalsrepeat();
    console.log("ce pressed!" + app.input);
    for (let i = app.input.length - 1; i >= 0; i--)
    {
        if (typeof app.input[i] === "number" || app.input[i] === ".")
        {
            console.log("c/e if triggered!");
            console.log(app.input);
            app.input.pop();
            console.log(app.input);
            console.log(app.display);
            app.display = app.display.slice(0, i);
            console.log(app.display);
        }
        else
        {
            break;
        }
        
    }        
    replay();
});

var updateScreen = function () {
    //console.log("Update the screen!");
    // remove any commas
    removeCommas();
    // clean up any trailing zeroes, if it's a decimal of more than one digit and has end zeroe(s):
    // could have bugs
    /*if (app.display.length > 0 && app.display[app.display.length - 1] === "0" && isDec())
    {
        for (var i = app.display.length; i >= 0; i--)
        {
            if (app.display[i] === "0")
            {
                app.display = app.display.slice(0, i);
                console.log("Trim activated!");
            }
            else if (app.display[i] === ".")
            { 
                break;
            }

        }
    }*/
    // add commas
    let crawler = app.display.length -1;
    let counter = 0;
    // start the comma search after the comma, if one exists
    if (isDec())
    {
        for(let i = app.display.length -1; i >= 0; i--)
        {
            if (app.display[i] === ".")
            {
                crawler = i -1; // start with the first whole digit
                break;
            }
        }
    }
    // add commas
    for (let j = crawler; j >= 0; j--)
    {
        counter += 1;
        if (counter % 3 === 0 && j > 0)
        {
            if (app.display[j - 1] != "-")
            {
                console.log("Counter: " + counter);
                console.log("J: " + j);
                // insert a comma
                app.display = app.display.slice(0, j) + "," + app.display.slice(j);
            }
        }
        
    }

    app.screen.innerHTML = app.display;
};

app.equals.addEventListener("click", function () {
    equalsign();
});

// make the percent feature work like iPhone calc's does: 
app.percent.addEventListener("click", function () {
    let holder = [];
    let numstr = "";
    let newnum;
    let decimal = false;

    for (let i = app.input.length - 1; i >= 0; i--)
    {
        if (app.input[i] === ".")
        {
            app.input.pop(); // immediately disregard terminal dot
        }
        else if (typeof app.input[i] === "number" || app.input[i] === ".")
        {
            if (app.input[i] === ".")
            {
                decimal = true;
            }
            console.log("Pop/swapping array item " + i);
            holder.unshift(app.input.pop());
           
        }
        else 
        {
            break;
        }
    }
    numstr = holder.join('');
    console.log("numstr: " + numstr);
    if (decimal || parseInt(numstr) !== parseFloat(numstr)) {
        newnum = parseFloat(numstr);          
    }
    else {
        newnum = parseInt(numstr); 
    }
    console.log("newnum pre percent" + newnum);
    newnum /= 100;
    console.log("newnum post percent" + newnum);
    
    app.display = "" + newnum;
    console.log("app.display: " + app.display + " is dec? " + isDec());

    // TODO: make sure this works and isn't horrifying bug adding spaghetti
    if (isDec() && app.display.length > 15) {
        let temp = newnum.toFixed(6);
        console.log("Trimmed down to: " + temp);
        app.display = "" + temp;
        newnum = parseFloat(temp);

    }
    if (app.display.length > 15 || newnum < 0.000001) {
        restart();
        return;
    }


    app.input.push(newnum);
    app.display = newnum;
    updateScreen();


})

app.sign.addEventListener("click", function ()
{
    console.log("Sign pressed, input is : " + app.input);
    if (app.input.length === 0 || isOperator(app.input[app.input.length -1]))
    {
        console.log("Can't perform +/- right now");
        return;
    }
    let holder = [];
    let decimal = false;
    let numstr;
    let newnum;
    let endflag = false;
    let inputlength = app.input.length;
    console.log("Start sign, input: " + app.input);

    // test to see if the most recent button press was a decimal
    if (app.input[app.input.length - 1] === ".")
    {
        endflag = true;
        console.log("End flag!");
    }

    // run backward until the beginning of the input or an operator
    for (let i = app.input.length - 1; i >= 0; i--)
    {
        
        if (typeof app.input[i] === "number" || app.input[i] === ".")
        {
            if (i === (inputlength - 1) && app.input[i] === ".")
            {
                app.input.pop();
                console.log("do nothing with the end period");
            }
            else
            {
                console.log("Pop/swapping array item " + i);
                holder.unshift(app.input.pop());
            }
        }
        else
        {
            break;
        }
    }

    // flip the negativity of the number
    numstr = holder.join('');
    console.log("numstr: " + numstr);
    if (decimal || parseInt(numstr) !== parseFloat(numstr))
    {
        newnum = 0 - parseFloat(numstr); // make it negative           
    }
    else
    {
        newnum = 0 - parseInt(numstr); // make it negative
    }
    console.log("newnum " + newnum);
    // store it
    app.input.push(newnum);
    if (endflag === true)
    {
        app.input.push("."); // put the period back
    }
    // update display for the sign flip
    if (newnum < 0)
    {
        app.display = "-" + app.display;
    }
    else if (newnum >= 0 && app.display[0] === "-")
    {
        app.display = app.display.slice(1);
    }
    else
    {
        app.display = "unexpected error in sign function. Sorry.";
    }
    updateScreen();
    console.log("Input :" + app.input);

});

var equalsign = function () {
    console.log("app.equalsrepeat: " + app.equalsrepeat + "app.input: " + app.input);
    if (isOperator(app.input[app.input.length - 1]))
    {
        console.log("Most recent input was an operator, can't do equals!");
        return;
    }
    if ((!operatorPressed() && app.equalsrepeat.length === 0) || app.lockout)
    {
        console.log("Locked out! operatorpress: " + operatorPressed() + " app.lockout: " + app.lockout);
        return;
    }
    if (app.equalsrepeat.length > 0)
    {
        console.log("oh boy! repeat the operation!");
        app.input = app.input.concat(app.equalsrepeat);
        app.equalsrepeat = [];
        //return;
    }
    let holder = [];
    let first = "";
    let firstnum;
    let second = [];
    let secondnum;
    let operation;
    let result;
    let decimal = false;
    for (let i = 0; i < app.input.length; i++)
    {
        //console.log("i i s..." + i);
        // read until you get first number entirely
        if (typeof app.input[i] === "number" || app.input[i] === ".")
        {
            //console.log("Adding " + app.input[i]);
            holder.push(app.input[i]); // add items to the front of the array
            //console.log(holder);
            if (app.input[i] === ".")
            {
                decimal = true;
            }
            if (app.equalsrepeat.length > 0)
            {
                app.equalsrepeat.push(app.input[i]);
            }

        }
        else // found the operator
        {
            app.equalsrepeat.push(app.input[i]);
            //console.log(holder);
            operation = app.input[i];
            first = holder.join('');
            //console.log(first);
            if (decimal || parseInt(first) !== parseFloat(first))
            {
                firstnum = parseFloat(first);
                console.log("decimal! It's: " + firstnum);
            }
            else
            {
                firstnum = parseInt(first);
            }
            
            console.log("firstnum: " + firstnum);
            holder = [];
            decimal = false;
        }

    }
    second = holder.join('');
    if (decimal || parseInt(second) !== parseFloat(second))
    {
        secondnum = parseFloat(second);
    }
    else
    {
        secondnum = parseInt(second);
    }
    decimal = false;    
    //console.log(second);
    console.log("secondnum: " + secondnum);
    holder = [];

    console.log(operation);

    switch (operation)
    {
        case "/": // divide
            result = firstnum / secondnum;
            break;
        case "x": // multiply
            result = firstnum * secondnum;
            break;
        case "m": // minus
            result = firstnum - secondnum;
            break;
        case "+": // plus
            result = firstnum + secondnum;            
            break;
    }
    console.log("Result: " + result);
    app.display = "" + result;
    // see if we got a very long decimal
    if (isDec() && app.display.length > 15)
    {
        let temp = result.toFixed(6);
        console.log("Trimmed down to: " + temp);
        app.display = "" + temp;
        result = parseFloat(temp);

    }
    if (app.display.length > 10 || (result < 0.000001 && result > 0))
    {
        console.log("Error: overflow. Result: " + result + " Display: " + app.display);
        restart();
        return;
    }
    updateScreen();
    app.input = [];
    app.input.push(result);
    //console.log(app.equalsrepeat);
    
};

var equalsrepeat = function ()
{
    console.log("equalsrepeat!");
    console.log(app.input);
    console.log(app.equalsrepeat);
}

var operatorPressed = function () {
    //console.log("Was an operator was pressed?");
    for (let i = 0; i < app.input.length; i++)
    {
        if (typeof app.input[i] !== "number" && app.input[i] !== ".")
        {
            //console.log(app.input[i] + " which is a " + typeof app.input[i]);
            return true;
        }

    }
    return false;
}

var isDec = function () {
    //console.log("Is the display a decimal? " + app.display.length);
    for (let i = 0; i < app.display.length; i++) {
        console.log(app.display[i]);
        if (app.display[i] === ".")
        {
            //console.log("Yes it is.");
            return true;
        }

    }
    return false;
}

var removeCommas = function () {
    //console.log("Is the display a decimal?");
    //console.log("Into remove commas: " + app.display);
    for (let i = 0; i < app.display.length; i++)
    {
        if (app.display[i] === ",")
        {
            app.display = app.display.slice(0, i) + app.display.slice(i + 1);
        }
    }
    //console.log("Leaving remove commas: " + app.display);
    return;
}

var replay = function ()
{
    let inputString = "";
    for (let i = 0; i < app.input.length; i++)
    {
        if (typeof app.input[i] === "number")
        {
            inputString += app.input[i];
        }
        else
        {
            inputString = (inputString + " " + app.input[i] + " ");
        }        
    }
    inputString = "clr";
    app.display = inputString;
    updateScreen();
}

var clearequalsrepeat = function()
{
    app.equalsrepeat= [];
}

var restart = function()
{
    app.lockout = true;
    app.screen.innerHTML = "E/Overflow?";
    app.input = [0];
    app.display = "";
}

var isOperator = function (n)
{
    if (n === "/" || n === "x" || n === "+" || n === "m")
    {
        return true;
    }
    else
    {
        return false;
    }
}

// !experimental!: listen for keys
// TODO: See how bad cross browser support will be

window.addEventListener("keyup", function (e) {
    console.log("Keycode: " + e.keyCode);
    switch (e.keyCode) {
        case 110: // dot pressed            
            dotpress();
            break;
        case 111: // divided by numpad
            app.divflag = true;
            addOperator("/");
            break;
        case 106: // multiply numpad            
            addOperator("x");
            break;
        case 107: // plus numpad            
            addOperator("+");
            break;
        case 109: // minus numpad            
            addOperator("m");
            break;
        case 13: // enter key
            equalsign();
            break;
        case 48: // 0 on number line
            zeroFunc();
            break;
        case 96: // 0 on numpad
            zeroFunc();
            break;
        case 97: // 1 on numpad
            numPress(1);
            break;
        case 98: // 2
            numPress(2);
            break;
        case 99: // 3
            numPress(3);
            break;
        case 100: // 4
            numPress(4);
            break;
        case 101: // 5
            numPress(5);
            break;
        case 102: // 6
            numPress(6);
            break;
        case 103: // 7
            numPress(7);
            break;
        case 104: // 8
            numPress(8);
            break;
        case 105: // 9 on numpad
            numPress(9);
            break;
        case 49: // 1 on number line
            numPress(1);
            break;
        case 50: // 2
            numPress(2);
            break;
        case 51: // 3
            numPress(3);
            break;
        case 52: // 4
            numPress(4);
            break;
        case 53: // 5
            numPress(5);
            break;
        case 54: // 6
            numPress(6);
            break;
        case 55: // 7
            numPress(7);
            break;
        case 56: // 8
            numPress(8);
            break;
        case 57: // 9 on number line
            numPress(9);
            break;
    }
});
