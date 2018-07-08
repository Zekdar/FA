'use strict'

/*
    New :
    1) Crée un objet vide
    2) Fait en sorte que l'objet créé hérite du prototype déclaré dans le constructeur
    3) Invoke le constructeur avec l'objet créé et les arguments du constructeur
    4) Si le contructeur retourne un objet, alors New le retourne. Sinon il retourne l'objet créé en étape 1
*/

function myNew(Ctor) {
  var obj = {}
  obj.__proto__ = Ctor.prototype
  
  var createdObj = Ctor.apply(obj, Array.prototype.slice.call(arguments, 1))
  
  if (typeof createdObj === 'object')
    return createdObj

  return obj
}

function MyCtor(arg) {
  if (arg)
    return { test: 42 }

  this.arg = 21
  return 42
}

MyCtor.prototype.sayHello = function () {
  console.log('hello')
}

var obj = myNew(MyCtor, 42)
console.log(obj instanceof MyCtor) // should print false
console.log(obj.test) // should print 42

obj = myNew(MyCtor)
console.log(obj.arg) // should print 21
console.log(obj instanceof MyCtor) // should print true
obj.sayHello() // should print hello