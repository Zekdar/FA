# bind

Recode the bind method of ECMAScript but handle only its first argument.
Starting point

```js
Function.prototype.myBind = function(/* … */) {
  // …
};

function simpleTest(a) {
  console.log(this);
  console.log(a);

  return 42;
}

var bound = simpleTest.myBind(42);
bound('a is a superb string');

console.log('--');

bound = simpleTest.myBind({test: 42});
console.log('The answer is: ' + bound('oh yes it is! (not like this)'));
```
