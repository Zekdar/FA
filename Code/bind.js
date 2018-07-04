'use strict'

// Bind
Function.prototype.myBind = function(thisArg) {
  var fn = this

  return function () {
    return fn.apply(thisArg, arguments)
  }
}

function simpleTest(a) {
  console.log(this)
  console.log(a)

  return 42
}

var bound = simpleTest.myBind(42)
bound('a is a superb string')

console.log('--')

bound = simpleTest.myBind({test: 42})
console.log('The answer is: ' + bound('oh yes it is! (not like this)'))

// Bind2
Function.prototype.myBind2 = function(thisArg) {
  var thisArg = arguments[0]
  var fn = this

  var args = Array.prototype.slice.call(arguments, 1)

  return function () {
    return fn.apply(thisArg, args.concat(Array.prototype.slice.call(arguments)))
  }
}

function addToThis(a, b) {
  return this + a + (b || 0)
}

var bound = addToThis.myBind2(40, 2)
console.log(bound()) // prints 42

bound = addToThis.myBind2(10, 20, 12)
console.log(bound()) // prints 42

bound = addToThis.myBind2(32)
console.log(bound(10)) // prints 42
