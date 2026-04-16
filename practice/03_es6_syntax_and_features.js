// Phase 1: Foundations
// ==========================================
// 03. ES6 Syntax & Features
// ==========================================

/* THEORY:
 * ES6 introduced modern features for cleaner code:
 * - Arrow Functions: Shorter syntax, no `arguments` object, lexical `this`.
 * - Destructuring: Extracting values from arrays/objects.
 * - Rest/Spread (...): Gathering elements into an array vs expanding an array into elements.
 * - Template Literals: String interpolation using backticks.
 */

// INTERVIEW QUESTION 1: Arrow Functions vs Regular Functions
function regular(...arg) {
    console.log(arguments); // Works
    console.log("arg" , arg);
}
regular(1, 2);

const arrow = (...args) => {
    // console.log(arguments); // ReferenceError
    console.log(args); // Use rest operator instead
};
arrow(1, 2);

// INTERVIEW QUESTION 2: Destructuring
const user = { name: "Alice", age: 25 };
const { name, age } = user;
console.log(name); // "Alice"

// Default values & renaming
const { name: userName = "Guest" } = user; 


// INTERVIEW QUESTION 3: Rest vs Spread
// Rest (gathering into an array) - Must be the last parameter
function sum(...numbers) {
    return numbers.reduce((curr, acc) => curr + acc, 0);
}

// Spread (expanding into elements)
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
