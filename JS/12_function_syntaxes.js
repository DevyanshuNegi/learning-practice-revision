// JavaScript Function Syntaxes Explained

// --- 1. Function Declaration ---
// This is the most classic way to define a function.
// - They are "hoisted," meaning they are loaded into memory at the start of their scope,
//   so you can call them before they are defined in the code.
console.log('--- Function Declaration ---');

console.log(greetDeclaration('Alice')); // Works because of hoisting

function greetDeclaration(name) {
  return `Hello, ${name}!`;
}

console.log(greetDeclaration('Bob'));
console.log('\n');


// --- 2. Function Expression ---
// Here, a function is assigned to a variable. The function can be named or anonymous.
// - They are not hoisted. You must define them before you can call them.
console.log('--- Function Expression ---');

// console.log(greetExpression('Charlie')); // This would cause a ReferenceError

const greetExpression = function(name) {
  return `Hi, ${name}!`;
};

console.log(greetExpression('Charlie'));
console.log('\n');


// --- 3. Arrow Function Expression ---
// A more concise syntax for writing function expressions, introduced in ES6.
// - They are not hoisted.
// - They do not have their own `this` context; they inherit it from the surrounding (lexical) scope.
// - Implicit return: If the function body is a single expression, you can omit the curly braces and the `return` keyword.
console.log('--- Arrow Function ---');

// Basic arrow function
const greetArrow = (name) => {
  return `Hey, ${name}!`;
};
console.log(greetArrow('David'));

// Arrow function with a single parameter (parentheses are optional)
const square = x => x * x;
console.log('Square of 5:', square(5));

// Arrow function with implicit return
const add = (a, b) => a + b;
console.log('Add 3 + 4:', add(3, 4));

// Arrow function with no parameters
const getRandomNumber = () => Math.random();
console.log('Random number:', getRandomNumber());
console.log('\n');


// --- 4. Immediately Invoked Function Expression (IIFE) ---
// A function that is defined and executed immediately.
// - Often used to create a private scope for variables, preventing them from polluting the global scope.
console.log('--- IIFE ---');

(function() {
  const privateVar = 'I am private';
  console.log(privateVar);
  console.log('This IIFE ran immediately.');
})();

// You cannot access privateVar here:
// console.log(privateVar); // Would cause a ReferenceError
console.log('\n');


// --- 5. Generator Function ---
// A special type of function that can be paused and resumed, allowing you to generate a sequence of values over time.
// - Defined using `function*`.
// - Uses the `yield` keyword to "return" a value and pause execution.
console.log('--- Generator Function ---');

function* numberGenerator() {
  yield 1;
  yield 2;
  console.log('After yielding 2');
  yield 3;
}

const generator = numberGenerator();

console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
// The "After yielding 2" message is logged here
console.log(generator.next().value); // 3
console.log(generator.next().done);  // true (no more values to yield)
console.log('\n');


// --- 6. Methods in Object Literals ---
// Functions can be defined as properties of an object. These are called methods.
console.log('--- Object Methods ---');

const person = {
  name: 'Eve',
  // Traditional method syntax
  sayHello: function() {
    return `Hello from ${this.name}`;
  },
  // ES6 method syntax (shorthand)
  sayGoodbye() {
    return `Goodbye from ${this.name}`;
  }
};

console.log(person.sayHello());
console.log(person.sayGoodbye());
console.log('\n');
