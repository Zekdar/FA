'use strict'

// Sol#1 : récursive
// function myIn(attr, obj) {
//   if (!obj)
//     return false

//   var descriptor = Object.getOwnPropertyDescriptor(obj, attr)
//   if (!descriptor)
//     return myIn(attr, Object.getPrototypeOf(obj))

//   return true
// }

// Sol#2 : itérative
function myIn(attr, obj) {
  while (true) {
    if (!obj)
      return false

    var descriptor = Object.getOwnPropertyDescriptor(obj, attr)
    if (descriptor)
      return true

    obj = Object.getPrototypeOf(obj)
  }
}

function myIn(attr, obj) {
  if (!obj)
    return false

  if (Object.keys(obj).includes(attr))
    return true

  return myIn(attr, Object.getPrototypeOf(obj))
}

var obj = { test: 42 };
console.log(myIn('test', obj)); // prints true
console.log(myIn('tset', obj)); // prints false

var obj2 = Object.create(obj);
console.log(myIn('test', obj2)); // prints true
console.log(myIn('tset', obj2)); // prints false

var obj3 = Object.create(obj2);
console.log(myIn('test', obj3)); // prints true
console.log(myIn('tset', obj3)); // prints false