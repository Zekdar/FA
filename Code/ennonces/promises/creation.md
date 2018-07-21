# Promises? What?!!

Promises are an asynchronous paradigm. They are very useful to prevent the famous callback hell. They often come with lots of useful tools to handle easily mass parallelism / synchonization and all this stuff.
Creating a promise

```js
var myPromise = new Promise(function(resolve, reject) {
  someAsyncProcess(function(err, res) {
    err ? reject(err) : resolve(res);
  });
});
```

Using a promise (basic)

```js
var myPromise = // ...;

myPromise
  .then(function(res) {
    // called with the result when it is available

    // here res2 can be a value or a promise of a value
    return res2;
  })
  .then(function(res2) {
    // ...
  })
;
```

Starting point

Recode the basic behaviour! Do not try to handle reject for the moment, we will speak of this later on.

```js
function Promise(cb) {
  // ...
}
// ...

function timeoutPromise(value) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(value);
    });
  });
}

function resolvedImmediately(value) {
  return new Promise(function(resolve) {
    resolve(value);
  });
}

new Promise(function() {
  console.log('this should be printed first');
});
console.log('this should be the second line');

timeoutPromise(42)
  .then(function(val) {
    console.log(val); // prints 42

    return timeoutPromise(21);
  })
  .then(function(val2) {
    console.log(val2); // prints 21
  })
;

resolvedImmediately(12)
  .then(function(val) {
    console.log(val); // prints 12
  })
;

var twoThings = timeoutPromise(6);

twoThings
  .then(function(val) {
    console.log(val); // prints 6

    return val * 2;
  })
;

twoThings
  .then(function(val) {
    console.log(val / 2); // prints 3

    return val * 2;
  })
;
```

Note: By the spec, the execution of then callbacks cannot happen in the same event loop turn than the call to then itself. You can use process.nextTick to achieve this.

```js
var promise = new Promise(function(resolve) {
  resolve(42);
});

promise.then(function(val) {
  console.log(val);
})

setTimeout(function() {
  promise.then(function(val) {
    console.log(val / 21);
  });
}, 100);

console.log('BEFORE'); // should be printed before 42 & 21
```

