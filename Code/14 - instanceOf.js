'use strict'

// Sol#1 : récursive
// function myInstanceOf(val, Ctor) {
//   if (!isObject(val))
//     return false

//   var valProto = Object.getPrototypeOf(val)

//   if (valProto === Ctor.prototype)
//     return true

//   if (!valProto)
//     return false

//   return myInstanceOf(valProto, Ctor)
// }

// Sol#2 : itérative
var valProto
function myInstanceOf(val, Ctor) {
  while (true) {
    if (!isObject(val))
      return false

    valProto = Object.getPrototypeOf(val)

    if (valProto === Ctor.prototype)
      return true

    if (!valProto)
      return false

    val = valProto
  }
}

function isObject(val) {
  return typeof val === 'object' || typeof val === 'function'
}

console.log(myInstanceOf({}, Object)) // should print true
console.log(myInstanceOf(42, Number)) // should print false
console.log(myInstanceOf(new Number(42), Number)) // should print true
console.log(myInstanceOf(function() {}, Function)) // true

function A() { }
function B() { }
B.prototype = Object.create(A.prototype)
var b = new B()
console.log(myInstanceOf(b, B)) // should print true
console.log(myInstanceOf(b, A)) // should print true
console.log(myInstanceOf(b, Object)) // should print true
console.log(myInstanceOf(b, Number)) // should print false