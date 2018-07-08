'use strict'

console.log(this) // prints console object properties

function myFunc() {
  console.log(this)
}
myFunc() // prints undefined (or global object in non strict mode)

var obj = { fn: myFunc, test: 42 }
obj.fn() // prints obj properties

obj.fn2 = function() {
  myFunc()
}
obj.fn2() // prints undefined (or global object in non strict mode)