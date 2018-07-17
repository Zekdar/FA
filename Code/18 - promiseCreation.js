function Promise(resolve) {
  var state = 'pending'
  
  return function(state) {
    state
  }
}

Promise.prototype.then = function (resolve) {
  return new Promise(resolve)
}
// ...

function timeoutPromise(value) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value)
    })
  })
}

function resolvedImmediately(value) {
  return new Promise(function (resolve) {
    resolve(value)
  })
}

new Promise(function () {
  console.log('this should be printed first')
})
console.log('this should be the second line')

timeoutPromise(42)
  .then(function (val) {
    console.log(val) // prints 42

    return timeoutPromise(21)
  })
  .then(function (val2) {
    console.log(val2) // prints 21
  })


resolvedImmediately(12)
  .then(function (val) {
    console.log(val) // prints 12
  })


var twoThings = timeoutPromise(6)

twoThings
  .then(function (val) {
    console.log(val) // prints 6

    return val * 2
  })


twoThings
  .then(function (val) {
    function Promise(cb) {
      // ...
    }
    // ...

    function timeoutPromise(value) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(value)
        })
      })
    }

    function resolvedImmediately(value) {
      return new Promise(function (resolve) {
        resolve(value)
      })
    }

    new Promise(function () {
      console.log('this should be printed first')
    })
    console.log('this should be the second line')

    timeoutPromise(42)
      .then(function (val) {
        console.log(val) // prints 42

        return timeoutPromise(21)
      })
      .then(function (val2) {
        console.log(val2) // prints 21
      })

    resolvedImmediately(12)
      .then(function (val) {
        console.log(val) // prints 12
      })


    var twoThings = timeoutPromise(6)

    twoThings
      .then(function (val) {
        console.log(val) // prints 6

        return val * 2
      })


    twoThings
      .then(function (val) {
        console.log(val / 2) // prints 3

        return val * 2
      })
    console.log(val / 2) // prints 3

    return val * 2
  })