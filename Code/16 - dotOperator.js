// function myDot(obj, attr) {
//   while (true) {
//     if (!obj)
//       return undefined

//     var descriptor = Object.getOwnPropertyDescriptor(obj, attr)
//     if (descriptor)
//       return descriptor.value

//     obj = Object.getPrototypeOf(obj)
//   }
// }

// var obj = { a: 42 }
// console.log(myDot(obj, 'a')) // prints 42

// var obj2 = Object.create(obj)
// console.log(myDot(obj2, 'a')) // prints 42

// console.log(myDot(obj2, 'b')) // prints undefined

function myDot(obj, attr) {
  var thisArg = obj

  while (true) {
    if (!obj)
      return undefined

    var descriptor = Object.getOwnPropertyDescriptor(obj, attr)
    if (descriptor) {
      if (descriptor.get)
        return descriptor.get.call(thisArg)

      return descriptor.value
    }

    obj = Object.getPrototypeOf(obj)
  }
}

var obj = {
  a: 42,
  b: false,
  c: undefined,
  get getter() {
    return this.a - 21
  },
  get falseGetter() {
    return false
  },
}

console.log(myDot(obj, 'a')) // prints 42
console.log(myDot(obj, 'getter')) // prints 21
console.log(myDot(obj, 'b')) // prints false
console.log(myDot(obj, 'falseGetter')) // prints false
console.log(myDot(obj, 'c')) // prints undefined

var obj2 = Object.create(obj)
obj2.a = 12
console.log(myDot(obj2, 'a')) // prints 12
console.log(myDot(obj2, 'getter')) // prints -9
console.log(myDot(obj2, 'b')) // prints false