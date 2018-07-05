function executeAll(fns) {
  return fns.reduce(function(acc, fn) {
    return function() {
      console.log("je rentre dans l'accu")
      acc.call(this)
      console.log("je sors de l'accu et j'esxecute la fonction accumulée")
      fn.call(this)
    }
  }, function() {})
}

var allNbs = executeAll([
  console.log.bind(console, '1'),
  console.log.bind(console, '2'),
  console.log.bind(console, '3'),
])
console.log('--') // prints "--"
allNbs() // prints "1" "2" "3" (on separate lines)

var thisTest = executeAll([function() {
  console.log(this.x)
}, function() {
  console.log(this.x / 2)
}])
thisTest.call({x: 42}) // prints "42" "21" (on separate lines)

// should work with an empty array
var doNothing = executeAll([])
doNothing()