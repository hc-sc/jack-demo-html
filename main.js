var app = {};
app.zero = document.getElementById("zero"), app.one = document.getElementById("one"), app.two = document.getElementById("two"), app.three = document.getElementById("three"), app.four = document.getElementById("four"), app.five = document.getElementById("five"), app.six = document.getElementById("six"), app.seven = document.getElementById("seven"), app.eight = document.getElementById("eight"), app.nine = document.getElementById("nine"), app.ac = document.getElementById("ac"), app.ce = document.getElementById("ce"), app.percent = document.getElementById("percent"), app.sign = document.getElementById("sign"), app.divide = document.getElementById("divide"), app.multiply = document.getElementById("multiply"), app.minus = document.getElementById("minus"), app.dot = document.getElementById("dot"), app.equals = document.getElementById("equals"), app.plus = document.getElementById("plus"), app.screen = document.getElementById("screen"), app.input = [], app.display = "", app.equalsrepeat = [], app.divflag = !1, app.lockout = !1, app.zero.addEventListener("click", function() {
    zeroFunc()
});
var zeroFunc = function() {
    if (console.log(app.divflag), app.divflag) return app.lockout = !0, void updateScreen();
    numPress(0)
};
app.one.addEventListener("click", function() {
    numPress(1)
}), app.two.addEventListener("click", function() {
    numPress(2)
}), app.three.addEventListener("click", function() {
    numPress(3)
}), app.four.addEventListener("click", function() {
    numPress(4)
}), app.five.addEventListener("click", function() {
    numPress(5)
}), app.six.addEventListener("click", function() {
    numPress(6)
}), app.seven.addEventListener("click", function() {
    numPress(7)
}), app.eight.addEventListener("click", function() {
    numPress(8)
}), app.nine.addEventListener("click", function() {
    numPress(9)
});
var numPress = function(p) {
        app.lockout = !1, app.divflag = !1, app.input.length > 9 ? restart() : (app.equalsrepeat.length > 0 && !isOperator(app.input[app.input.length - 1]) && (app.display = "" + p, app.input = []), clearequalsrepeat(), 0 === app.input.length ? app.display = "" + p : "number" != typeof app.input[app.input.length - 1] && "." !== app.input[app.input.length - 1] ? app.display = "" + p : app.display += p, app.input.push(p), updateScreen())
    },
    addOperator = function(p) {
        console.log("Input before addOperator: " + app.input), clearequalsrepeat(), operatorPressed() && "number" == typeof app.input[app.input.length - 1] ? (equalsign(), app.input.push(p)) : "number" != typeof app.input[app.input.length - 1] ? app.input[app.input.length - 1] = p : app.input.push(p), console.log("Input after addOperator: " + app.input)
    };
app.plus.addEventListener("click", function() {
    addOperator("+")
}), app.multiply.addEventListener("click", function() {
    addOperator("x")
}), app.divide.addEventListener("click", function() {
    app.divflag = !0, addOperator("/")
}), app.minus.addEventListener("click", function() {
    addOperator("m")
}), app.ac.addEventListener("click", function() {
    clearequalsrepeat(), app.input = [], app.display = "0", updateScreen()
}), app.dot.addEventListener("click", function() {
    dotpress()
});
var dotpress = function() {
    console.log("For debugging, here's typeof what was just pressed: "), console.log(typeof app.input[app.input.length - 1]), app.input.length >= 1 && "." === app.input[app.input.length - 1] || ((0 === app.input.length || "number" != typeof app.input[app.input.length - 1] || app.equalsrepeat.length > 0) && ((0 === app.input.length || app.equalsrepeat.length > 0) && (app.input = []), console.log("Dot pressed and needs to be zero+"), clearequalsrepeat(), console.log("Either no input yet, or just finished an operation"), app.input.push(0), app.display = "0"), app.input.push("."), app.display += ".", updateScreen(), console.log(app.input))
};
app.ce.addEventListener("click", function() {
    clearequalsrepeat(), console.log("ce pressed!" + app.input);
    for (let p = app.input.length - 1; p >= 0 && ("number" == typeof app.input[p] || "." === app.input[p]); p--) console.log("c/e if triggered!"), console.log(app.input), app.input.pop(), console.log(app.input), console.log(app.display), app.display = app.display.slice(0, p), console.log(app.display);
    replay()
});
var updateScreen = function() {
    removeCommas();
    let p = app.display.length - 1,
        e = 0;
    if (isDec())
        for (let e = app.display.length - 1; e >= 0; e--)
            if ("." === app.display[e]) {
                p = e - 1;
                break
            } for (let n = p; n >= 0; n--)(e += 1) % 3 == 0 && n > 0 && "-" != app.display[n - 1] && (console.log("Counter: " + e), console.log("J: " + n), app.display = app.display.slice(0, n) + "," + app.display.slice(n));
    app.screen.innerHTML = app.display
};
app.equals.addEventListener("click", function() {
    equalsign()
}), app.percent.addEventListener("click", function() {
    let p, e = [],
        n = "",
        t = !1;
    for (let p = app.input.length - 1; p >= 0; p--)
        if ("." === app.input[p]) app.input.pop();
        else {
            if ("number" != typeof app.input[p] && "." !== app.input[p]) break;
            "." === app.input[p] && (t = !0), console.log("Pop/swapping array item " + p), e.unshift(app.input.pop())
        } if (n = e.join(""), console.log("numstr: " + n), p = t || parseInt(n) !== parseFloat(n) ? parseFloat(n) : parseInt(n), console.log("newnum pre percent" + p), p /= 100, console.log("newnum post percent" + p), app.display = "" + p, console.log("app.display: " + app.display + " is dec? " + isDec()), isDec() && app.display.length > 15) {
        let e = p.toFixed(6);
        console.log("Trimmed down to: " + e), app.display = "" + e, p = parseFloat(e)
    }
    app.display.length > 15 || p < 1e-6 ? restart() : (app.input.push(p), app.display = p, updateScreen())
}), app.sign.addEventListener("click", function() {
    if (console.log("Sign pressed, input is : " + app.input), 0 === app.input.length || isOperator(app.input[app.input.length - 1])) return void console.log("Can't perform +/- right now");
    let p, e, n = [],
        t = !1,
        a = app.input.length;
    console.log("Start sign, input: " + app.input), "." === app.input[app.input.length - 1] && (t = !0, console.log("End flag!"));
    for (let p = app.input.length - 1; p >= 0 && ("number" == typeof app.input[p] || "." === app.input[p]); p--) p === a - 1 && "." === app.input[p] ? (app.input.pop(), console.log("do nothing with the end period")) : (console.log("Pop/swapping array item " + p), n.unshift(app.input.pop()));
    p = n.join(""), console.log("numstr: " + p), e = parseInt(p) !== parseFloat(p) ? 0 - parseFloat(p) : 0 - parseInt(p), console.log("newnum " + e), app.input.push(e), !0 === t && app.input.push("."), e < 0 ? app.display = "-" + app.display : e >= 0 && "-" === app.display[0] ? app.display = app.display.slice(1) : app.display = "unexpected error in sign function. Sorry.", updateScreen(), console.log("Input :" + app.input)
});
var equalsign = function() {
        if (console.log("app.equalsrepeat: " + app.equalsrepeat + "app.input: " + app.input), isOperator(app.input[app.input.length - 1])) return void console.log("Most recent input was an operator, can't do equals!");
        if (!operatorPressed() && 0 === app.equalsrepeat.length || app.lockout) return void console.log("Locked out! operatorpress: " + operatorPressed() + " app.lockout: " + app.lockout);
        app.equalsrepeat.length > 0 && (console.log("oh boy! repeat the operation!"), app.input = app.input.concat(app.equalsrepeat), app.equalsrepeat = []);
        let p, e, n, t, a = [],
            o = "",
            i = [],
            l = !1;
        for (let e = 0; e < app.input.length; e++) "number" == typeof app.input[e] || "." === app.input[e] ? (a.push(app.input[e]), "." === app.input[e] && (l = !0), app.equalsrepeat.length > 0 && app.equalsrepeat.push(app.input[e])) : (app.equalsrepeat.push(app.input[e]), n = app.input[e], o = a.join(""), l || parseInt(o) !== parseFloat(o) ? (p = parseFloat(o), console.log("decimal! It's: " + p)) : p = parseInt(o), console.log("firstnum: " + p), a = [], l = !1);
        switch (i = a.join(""), e = l || parseInt(i) !== parseFloat(i) ? parseFloat(i) : parseInt(i), l = !1, console.log("secondnum: " + e), a = [], console.log(n), n) {
            case "/":
                t = p / e;
                break;
            case "x":
                t = p * e;
                break;
            case "m":
                t = p - e;
                break;
            case "+":
                t = p + e
        }
        if (console.log("Result: " + t), app.display = "" + t, isDec() && app.display.length > 15) {
            let p = t.toFixed(6);
            console.log("Trimmed down to: " + p), app.display = "" + p, t = parseFloat(p)
        }
        if (app.display.length > 10 || t < 1e-6 && t > 0) return console.log("Error: overflow. Result: " + t + " Display: " + app.display), void restart();
        updateScreen(), app.input = [], app.input.push(t)
    },
    equalsrepeat = function() {
        console.log("equalsrepeat!"), console.log(app.input), console.log(app.equalsrepeat)
    },
    operatorPressed = function() {
        for (let p = 0; p < app.input.length; p++)
            if ("number" != typeof app.input[p] && "." !== app.input[p]) return !0;
        return !1
    },
    isDec = function() {
        for (let p = 0; p < app.display.length; p++)
            if (console.log(app.display[p]), "." === app.display[p]) return !0;
        return !1
    },
    removeCommas = function() {
        for (let p = 0; p < app.display.length; p++) "," === app.display[p] && (app.display = app.display.slice(0, p) + app.display.slice(p + 1))
    },
    replay = function() {
        let p = "";
        for (let e = 0; e < app.input.length; e++) "number" == typeof app.input[e] ? p += app.input[e] : p = p + " " + app.input[e] + " ";
        p = "clr", app.display = p, updateScreen()
    },
    clearequalsrepeat = function() {
        app.equalsrepeat = []
    },
    restart = function() {
        app.lockout = !0, app.screen.innerHTML = "E/Overflow?", app.input = [0], app.display = ""
    },
    isOperator = function(p) {
        return "/" === p || "x" === p || "+" === p || "m" === p
    };
