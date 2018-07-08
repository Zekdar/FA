'use strict'

function add(a, b) { return a + b }
function sub(a, b) { return a - b }
function mul(a, b) { return a * b }
function div(a, b) { return a / b }
function cos(a) { return Math.cos(a) }
function constant(val) {
  return function() {
    return val
  }
}
function variable(name) {
  return function() {
    return this[name]
  }
}

function tokenToAction(token) {
  // handle operators
  switch (token) {
  case '+': return add
  case '-': return sub
  case '*': return mul
  case '/': return div
  case 'cos': return cos
  }

  // handle variables
  if (token.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/))
    return variable(token)

  // handle numbers
  if (!isNaN(+token))
    return constant(+token)

  throw new Error('Unknown token ' + token)
}

function internalParser(tokens) {
  if (!tokens.length)
    throw new Error('Not enough tokens....')

  // convert first token to action and remove it from tokens
  var action = tokenToAction(tokens.shift())

  // if action takes no arguments, return it
  if (!action.length)
    return action

  // get a function for each expression
  var parsingExprs = []
  for (var i = 0; i < action.length; ++i)
    parsingExprs.push(internalParser(tokens))

  // construct a function that construct an array of args for action()
  var constructArgsArray = parsingExprs.reduce(function(acc, exprFn) {
    return function() {
      return acc.call(this).concat(exprFn.call(this))
    }
  }, constant([]))

  // call actions with the correct this & args
  return function() {
    return action.apply(this, constructArgsArray.call(this))
  }
}

function parser(expr) {
  var tokens = expr.split(/\s+/)

  var res = internalParser(tokens)

  if (tokens.length)
    throw new Error('Too many tokens....')

  return res
}

var expr = parser('cos a')
console.log(expr.call({a: 42}))