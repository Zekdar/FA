'use strict'

/* Ici le mode strict est obligatoire. Pour le dernier exemple, si on est pas en mode strict,
bien que la propriété get soit writable = false, la ligne 81 sera executée mais n'aura aucun effet.
L'exception ne sera donc pas levée */

function myDp(obj, attr, mode, valueOrGetter, setter) {
  if (!valueOrGetter) {
    valueOrGetter = mode
    mode = null
  }

  mode = mode === '' || mode ? mode : 'cw'

  var config = {
    enumerable: mode.includes('e'),
    configurable: mode.includes('c'),
  }

  if (mode.includes('#')) {
    if (valueOrGetter)
      config.get = valueOrGetter

    if (setter)
      config.set = setter
  }
  else {
    if (mode.includes('w'))
      config.writable = true

    config.value = valueOrGetter
  }

  return Object.defineProperty(obj, attr, config)
}

var obj = {}

console.log('-- a --')
myDp(obj, 'a', 42)
console.log(obj.a) // prints 42
var apd = Object.getOwnPropertyDescriptor(obj, 'a')
console.log(apd.enumerable) // prints false
console.log(apd.writable) // prints true
console.log(apd.configurable) // prints true

console.log('\n-- b --')
myDp(obj, 'b', 'e', 42)
console.log(obj.b) // prints 42
var apd = Object.getOwnPropertyDescriptor(obj, 'b')
console.log(apd.enumerable) // prints true
console.log(apd.writable) // prints false
console.log(apd.configurable) // prints false

console.log('\n-- c --')
myDp(obj, 'c', null, '42')
console.log(obj.c) // prints 42
var apd = Object.getOwnPropertyDescriptor(obj, 'c')
console.log(apd.enumerable) // prints false
console.log(apd.writable) // prints true
console.log(apd.configurable) // prints true

console.log('\n-- d --')
myDp(obj, 'd', '', '42')
console.log(obj.d) // prints 42
var apd = Object.getOwnPropertyDescriptor(obj, 'd')
console.log(apd.enumerable) // prints false
console.log(apd.writable) // prints false
console.log(apd.configurable) // prints false

console.log('\n-- get --')
myDp(obj, 'get', '#ec', function () {
  return 42
})
console.log(obj.get) // prints 42
try {
  obj.get = 21
  console.log('should not be printed!')
}
catch (e) {
  console.log('should be there')
}