# Object.create 2

You may have noticed earlier. We forgot one argument to Object.create. It can define properties on the resulting object in one go.

The full prototype is Object.create(obj, propertiesObject). Add support for this final argument to your implementation of Object.create.

This will be trivial if you know that a function Object.defineProperties does exist. You can find its documentation here.

For more information on Object.create, you can refer to the MDN documentation.

Test:

```js
var obj3 = {};
var obj4 = myObjectCreate(obj3, {test: {value: 42}});
console.log(obj4.test); // prints 42
```
