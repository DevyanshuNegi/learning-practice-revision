const p1 = {
    name: 'John',
    age: 30,
    display() {
        console.log(this.name, this.age);
    }
}

const p2 = Object.create(p1);
// p2 is an empty object, but its prototype is p1

// p2 proto -> p1 proto -> Object.prototype -> null
// but in reality 
/**
 * Object {  }
​
<prototype>: Object { name: "John", age: 30, display: display() }​
age: 30
display: function display()
name: "John"
<prototype>: Object { … }
__defineGetter__: function __defineGetter__()
​__defineSetter__: function __defineSetter__()
​__lookupGetter__: function __lookupGetter__()
​__lookupSetter__: function __lookupSetter__()
​__proto__: Object { name: "John", age: 30, display: display() }
​age: 30
​display: function display()
​name: "John"
​<prototype>: Object { … }
​__defineGetter__: function __defineGetter__()
​__defineSetter__: function __defineSetter__()
​__lookupGetter__: function __lookupGetter__()
​__lookupSetter__: function __lookupSetter__()
​__proto__: Object { … }
​__defineGetter__: function __defineGetter__()
​__defineSetter__: function __defineSetter__()
​__lookupGetter__: function __lookupGetter__()
​__lookupSetter__: function __lookupSetter__()
​__proto__: null
​constructor: function Object()
​hasOwnProperty: function hasOwnProperty()
​isPrototypeOf: function isPrototypeOf()
​propertyIsEnumerable: function propertyIsEnumerable()
​toLocaleString: function toLocaleString()
​toString: function toString()
​valueOf: function valueOf()
​<get __proto__()>: function __proto__()
​<set __proto__()>: function __proto__()
​constructor: function Object()
​hasOwnProperty: function hasOwnProperty()
​isPrototypeOf: function isPrototypeOf()
​propertyIsEnumerable: function propertyIsEnumerable()
​toLocaleString: function toLocaleString()
​toString: function toString()
​valueOf: function valueOf()
​<get __proto__()>: function __proto__()
​<set __proto__()>: function __proto__()
​constructor: function Object()
​hasOwnProperty: function hasOwnProperty()
​isPrototypeOf: function isPrototypeOf()
​propertyIsEnumerable: function propertyIsEnumerable()
​toLocaleString: function toLocaleString()
​toString: function toString()
​valueOf: function valueOf()
​<get __proto__()>: function __proto__()
​<set __proto__()>: function __proto__()
 */
console.log(p2);
console.log(p1);

/**
 * 
// "" -> string class -> String.prototype -> Object.prototype -> null
var f = "23";
console.log(f.__proto__); // String {"", constructor: ƒ, length: 0, charAt: ƒ, charCodeAt: ƒ, …} (the prototype of a string primitive is String.prototype)
console.log(f.__proto__.__proto__); // Object {constructor: ƒ, hasOwnProperty: ƒ, isPrototypeOf: ƒ, propertyIsEnumerable: ƒ, toLocaleString: ƒ, …} (the prototype of String.prototype is Object.prototype)
console.log(f.__proto__.__proto__.__proto__); // null (the prototype of Object.prototype is null)

var obj = {};
console.log(obj.__proto__); // {} (the prototype of obj is Object.prototype)
console.log(obj.__proto__.__proto__); // null (the prototype of Object.prototype is null)
*/