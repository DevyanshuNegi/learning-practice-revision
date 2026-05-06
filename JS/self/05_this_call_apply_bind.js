// Phase 2: Memory & Context
// ==========================================
// 05. this, call, apply, bind
// ==========================================

/* THEORY:
 * `this` refers to the context in which a function is invoked.
 * Explicit Binding overrides default `this` using:
 * - call: invoke function, pass args by comma sequence.
 * - apply: invoke function, pass args as an array.
 * - bind: returns a new function with bound `this`, doesn't invoke immediately.
 */

// INTERVIEW QUESTION 1: Default Context
const person = {
    name: "John",
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
}
person.greet(); // "Hi, I'm John" (Context is `person` object)

const detachedGreet = person.greet;
// detachedGreet(); // "Hi, I'm undefined" (Context lost, default to global/window)

// INTERVIEW QUESTION 2: Explicit Binding
const newContext = { name: "Alice" };

function introduce(age, role) {
    console.log(`I'm ${this.name}, ${age} yrs old, acting as ${role}`);
}

introduce.call(newContext, 25, "Dev");               // comma separated
introduce.apply(newContext, [25, "Dev"]);            // array
const boundIntroduce = introduce.bind(newContext);   // returns function
boundIntroduce(25, "Dev");


// INTERVIEW QUESTION 3: Custom Bind Polyfill
Function.prototype.myBind = function(context, ...args) {
    // 'this' refers to the original function
    const originalFn = this; 
    
    return function(...innerArgs) {
        // use apply to run original function on the bound context
        return originalFn.apply(context, [...args, ...innerArgs]);
    };
};

const myBoundFn = introduce.myBind(newContext, 30);
myBoundFn("Manager"); // "I'm Alice, 30 yrs old, acting as Manager"
