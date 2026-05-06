// Phase 1: Foundations
// ==========================================
// 02. Hoisting & Scope
// ==========================================

/* THEORY:
 * Hoisting: JS moves declarations (not initializations) to the top of their scope during compile phase.
 * Scope: Where variables are accessible.
 *   - var: Function or global scoped.
 *   - let/const: Block scoped.
 * Temporal Dead Zone (TDZ): Time between entering block scope and variable declaration for let/const.
 */

// INTERVIEW QUESTION 1: Variable Hoisting (var vs let)
console.log(a); // undefined (declaration hoisted, initialized to undefined)
var a = 10;

// console.log(b); // ReferenceError: Cannot access 'b' before initialization (in TDZ)
let b = 20;
// why b doesn't work? because let is block scoped and is in the temporal dead zone until it's declared. Accessing it before declaration results in a ReferenceError.
// it means only var declarations are hoisted and initialized to undefined, while let and const declarations are hoisted but not initialized, leading to the TDZ.

// INTERVIEW QUESTION 2: Function Hoisting
sayHi(); // Works! Outputs "Hi"

function sayHi() {
    console.log("Hi");
}

// INTERVIEW QUESTION 3: Block Scope
{
    var scopedVar = "I am global or function scoped";
    let scopedLet = "I am block scoped";
}

console.log(scopedVar); // "I am global or function scoped"
// console.log(scopedLet); // ReferenceError: scopedLet is not defined


// testing
function test() {
    var x = 1;
}

console.log(x); // ReferenceError: x is not defined (x is function-scoped, not accessible outside the function)