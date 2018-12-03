'use strict';

function Promise(cb) {
  this.state = 'pending';
  this.value = null;
  this.resolvedCbs = [];

  cb(this.$resolve.bind(this, 'resolved'), this.$resolve.bind(this, 'rejected'));
}

Promise.prototype.$resolve = function(state, value) {
  if (this.state !== 'pending')
    throw new Error(
      'Cannot change state to ' + state + ' on an already ' + this.state + ' promise!'
    );

  this.state = state;
  this.value = value;

  this.resolvedCbs.forEach(function(cb) {
    cb();
  });

  this.resolvedCbs = null;
};

Promise.prototype.$executeCb = function(resolve, reject, onFulfilled, onRejected) {
  try {
    var val = (this.state === 'resolved' ? onFulfilled : onRejected)(this.value);
    if (val instanceof Promise) val.then(resolve, reject);
    else resolve(val);
  } catch (err) {
    reject(err);
  }
};

Promise.prototype.then = function(onFulFilled, onRejected) {
  return new Promise(
    function(resolve, reject) {
      var exe = this.$executeCb.bind(this, resolve, reject, onFulFilled, onRejected);

      if (this.state !== 'pending') process.nextTick(exe);
      else this.resolvedCbs.push(exe);
    }.bind(this)
  );
};

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
  });

resolvedImmediately(12).then(function(val) {
  console.log(val); // prints 12
});

var twoThings = timeoutPromise(6);

twoThings.then(function(val) {
  console.log(val); // prints 6

  return val * 2;
});

twoThings.then(function(val) {
  console.log(val / 2); // prints 3

  return val * 2;
});
