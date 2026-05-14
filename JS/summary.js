// ==========================================
// JAVASCRIPT INTERVIEW MASTER REVISION SHEET
// ==========================================

/**
 * 1. HOISTING & THE TEMPORAL DEAD ZONE (TDZ)
 * ------------------------------------------
 * Engineer Explanation:
 * Hoisting is JavaScript's process of allocating memory for variable and function 
 * declarations during the compile phase, before the code is executed. 
 * - Function declarations are fully hoisted (can be called before definition).
 * - `var` is hoisted but initialized as `undefined`. 
 * - `let` and `const` are hoisted too, but they are placed in a Temporal Dead Zone (TDZ) 
 * and cannot be accessed until the engine evaluates their specific line of code.
 */
console.log(a); // undefined
// console.log(b); // ReferenceError: Cannot access 'b' before initialization (TDZ)
var a = 10;
const b = 10;


/**
 * 2. TYPE COERCION & EQUALITY
 * ---------------------------
 * Engineer Explanation:
 * Type coercion is when JavaScript implicitly converts one data type into another to 
 * complete an operation. The loose equality operator (==) triggers coercion to make 
 * types match, which is why 1 == '1' is true. We use strict equality (===) because 
 * it checks both value and type, preventing coercion bugs.
 * * Falsy values:
 * - undefined : variable created but not initialized
 * - null : intentional absence of an object (typeof null === 'object' is a legacy bug)
 * - NaN : not a valid number result (typeof NaN === 'number')
 * - false, 0, -0, 0n, "", document.all
 */
console.log(typeof null); // "object"
console.log(typeof NaN);  // "number"


/**
 * 3. ARROW FUNCTIONS VS. NORMAL FUNCTIONS
 * ---------------------------------------
 * Engineer Explanation:
 * A normal function binds its own `this` dynamically based on how it is invoked. 
 * An arrow function does not have its own `this`; it inherits it lexically from the 
 * parent scope where it was defined. Arrow functions also lack the `arguments` object 
 * and cannot be used as constructors with the `new` keyword.
 */
function sum(...args) {
    console.log(args); // Works: Rest parameter
}

const s = (...args) => {
    console.log(args); // Works: Arrow functions support Rest parameters
}

function mul() {
    console.log(arguments); // Works: normal functions have 'arguments' object
}

const m = () => {
    // console.log(arguments); // ReferenceError: arguments is not defined
    console.log("Arrow functions do not have their own arguments object");
}


/**
 * 4. DESTRUCTURING
 * ----------------
 * Engineer Explanation:
 * Destructuring is a syntax feature that lets us unpack values from arrays or properties 
 * from objects directly into distinct variables. It supports renaming variables on the fly, 
 * setting default fallback values, and extracting deeply nested properties in a single line.
 */
const usr = { name: "abc", age: 23 };
const { name, age } = usr;
const { name: n, age: ag } = usr; // renaming
console.log(name, age); // abc 23
console.log(n, ag);     // abc 23

const arr = [3, 4, 5];
const arr1 = [1, 2, ...arr]; // Spread operator to clone/merge
console.log(arr1);


/**
 * 5. PASS-BY-VALUE VS. PASS-BY-REFERENCE
 * --------------------------------------
 * Engineer Explanation:
 * JavaScript strictly passes all arguments by value. However, for objects and arrays, 
 * the 'value' being passed is actually a reference to a memory location. If you mutate 
 * an object inside a function, it affects the original object. To prevent this, we use 
 * shallow copies (spread operator) or deep copies (structuredClone).
 */
function pr(arg) { console.log(arg); }

// Primitive (pass by value)
const val = 10;
pr(val); 

// Object (pass by reference)
const emp = { val: 10 };
pr(emp); 

// Shallow copy techniques
const o1 = { asd: 10 };
const o2 = o1;                  // Same reference
const o3 = { ...o1 };           // Spread (shallow copy)
const o4 = Object.assign({}, o1); // Object.assign (shallow copy)


/**
 * 6. CONTEXT (`this`) & EXPLICIT BINDING (call, apply, bind)
 * ----------------------------------------------------------
 * Engineer Explanation:
 * `this` represents the execution context. In a standard method, it points to the object 
 * calling it. If extracted, it loses that context. 
 * `call` and `apply` execute a function immediately with a manually set `this` (call takes 
 * comma-separated args, apply takes an array). `bind` returns a brand-new function with 
 * `this` permanently locked.
 */
const person = {
    name: "ram",
    sayHi() { console.log("Hi, I am ", this.name); }
}

const det_hi = person.sayHi;
person.sayHi(); // "Hi, I am ram" (context intact)
det_hi();       // "Hi, I am undefined" (context lost)

function separate_hi(age) {
    console.log("Hi there I'm ", this.name, " and I am ", age);
}
const context = { name: "Raman" }

separate_hi.call(context, 32);                  // call
separate_hi.apply(context, [32]);               // apply
const bound_hi = separate_hi.bind(context);     // bind
bound_hi(32);

// Interview Bonus: Custom bind polyfill
Function.prototype.myBind = function(ctx, ...outerArgs) {
    const originalFn = this;
    return function(...innerArgs) {
        return originalFn.apply(ctx, [...outerArgs, ...innerArgs]);
    };
};


/**
 * 7. PROTOTYPES AND INHERITANCE
 * -----------------------------
 * Engineer Explanation:
 * Every object in JS has an internal hidden link to a prototype object. When accessing 
 * a property, the engine checks the object first, then travels up the 'prototype chain' 
 * until it finds it or hits null. ES6 `class` is syntactic sugar over this prototype chain.
 */
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    console.log(this.name, " speaks");
}

function Dog(name, breed) {
    Animal.call(this, name); // Super constructor call
    this.breed = breed;
}
// Correct inheritance setup
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    console.log(this.name, " barks");
}

const d = new Dog("Rex", "Pug");
d.speak(); // Rex barks

// Modern ES6 Class syntax
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    speak() { console.log(this.name, " says meow"); }
}


/**
 * 8. CLOSURES
 * -----------
 * Engineer Explanation:
 * A closure is created when an inner function 'remembers' the variables and arguments 
 * of its outer, lexical scope, even after the outer function has finished executing. 
 * This is the core mechanism for data encapsulation and private variables.
 */
function createCounter() {
    let c = 0; // Private variable trapped in closure
    return {
        inc() { c++ },
        dec() { c-- },
        display() { console.log(c) },
    }
}
let counter = createCounter();
counter.inc();
counter.display(); // 1


/**
 * 9. PROMISES & ASYNC FLOW
 * ------------------------
 * Engineer Explanation:
 * A Promise represents the eventual success or failure of an async operation, solving 
 * 'callback hell'. It is always Pending, Fulfilled, or Rejected. We consume them using 
 * .then/.catch or async/await. 
 */
let p = new Promise((resolve, reject) => {
    let success = true;
    if (success) resolve("success data");
    else reject("error reason");
});

p.then(data => console.log(data))
 .catch(err => console.error(err))
 .finally(() => console.log("promise finished"));

// Promise Combinators:
// Promise.all([p1, p2])      -> Waits for all, fails fast if one rejects
// Promise.allSettled([p1])   -> Waits for all, returns array of objects with statuses
// Promise.race([p1, p2])     -> First one to settle (resolve or reject) wins
// Promise.any([p1, p2])      -> First one to fulfill (resolve) wins


/**
 * 10. ARRAY METHODS (map, filter, reduce)
 * ---------------------------------------
 * Engineer Explanation:
 * Declarative, higher-order methods that avoid manual loops and do not mutate the 
 * original array. 
 * - map: transforms every element, returns array of same length.
 * - filter: returns array of elements that pass a condition.
 * - reduce: accumulates array values down into a single output.
 */
let arrr = [3, 4, 5, 6, 7];

const doubled = arrr.map(item => item * 2);
const evens = arrr.filter(item => item % 2 === 0);
const sum = arrr.reduce((acc, curr) => acc + curr, 0); // 0 is initial value


/**
 * 11. DEBOUNCE VS THROTTLE
 * ------------------------
 * Engineer Explanation:
 * Performance optimization techniques for high-frequency events.
 * - Debounce: Delays execution until a certain amount of idle time has passed 
 * (e.g., waiting for user to stop typing in search bar).
 * - Throttle: Guarantees the function runs at most once within a specified time 
 * limit (e.g., window scroll or resize).
 */
function simpleDebounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    }
}

function simpleThrottle(func, limit) {
    let waiting = false;
    return (...args) => {
        if (!waiting) {
            func(...args);
            waiting = true;
            setTimeout(() => { waiting = false; }, limit);
        }
    }
}


/**
 * =====================================================================
 * RAPID REVISION KEYWORDS CHECKLIST (For Mental Spaced Repetition)
 * =====================================================================
 * 1. Execution basics: JS engine, execution context, creation/execution phase, call stack.
 * 2. Scope basics: global, function, block, lexical environment, scope chain, TDZ.
 * 3. Variables/Types: var/let/const, primitives vs reference, typeof null/NaN.
 * 4. Comparisons: coercion, truthy/falsy, == vs ===.
 * 5. Functions: declarations, expressions, arrow, IIFE, callbacks.
 * 6. Function behavior: this, arguments, rest, spread, call, apply, bind.
 * 7. Objects/Memory: literal, shorthand, pass-by-value/ref, mutation, deep/shallow copy.
 * 8. Object utilities: Object.keys, values, entries, assign, freeze, seal.
 * 9. Prototypes/Classes: constructor fn, prototype vs __proto__, Object.create, class/super.
 * 10. Closures: lexical scope, data hiding, currying, memoization.
 * 11. Arrays: map, filter, reduce, find, some, every, sort, slice, splice, chaining.
 * 12. Async: callbacks, Promises, all/allSettled/race/any, async/await.
 * 13. Event loop: synchronous code, Web APIs, microtask queue, macrotask queue.
 * 14. Modules: import/export, default vs named, structuredClone.
 */