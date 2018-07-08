'use strict'

function addX(x) {
  return function (y) { 
    return x + y 
  }
}

const add5 = addX(5)

console.log(add5(0), add5(37)) // prints "5 42"

// buggy example
for (var i = 0; i < 10; ++i) {
  setTimeout(function() {
    console.log(i)
  })
}

// Sol#1 : IIFE Imediately Invoked Function Expression
for (var i = 0; i < 10; ++i) {
  (function(j) {
    setTimeout(function() {
      console.log(j)
    })
  })(i)
}

// Sol#2 : Sol#1 refactored
function logWithTimeout(i) {
  setTimeout(function() {
    console.log(i);
  })
}

for (var i = 0; i < 10; ++i) {
  logWithTimeout(i)
}

// Sol#3
for (var i = 0; i < 10; ++i) {
  setTimeout(logI(i))
}

function logI(i) {
  return function () { console.log(i) }
}

console.log(-1)