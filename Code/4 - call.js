'use strict'

Function.prototype.myCall = function() {
  return this.apply(arguments[0], Array.prototype.slice.apply(arguments, [1]))
}

function addToThis(a, b) {
  return this + a + b
}

const res1 = addToThis.call(30, 7, 5)
const res2 = addToThis.myCall(30, 7, 5)
console.log(res1 + ' = ' + res2)