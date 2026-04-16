// Phase 2: Memory & Context
// ==========================================
// 04. Object References & Cloning
// ==========================================

/* THEORY:
 * Primitives (string, number, boolean) are passed by Value.
 * Objects (arrays, functions, objects) are passed by Reference (memory address).
 * Shallow Copy: Copies top-level properties. Nested objects still share references.
 * Deep Copy: Completely independent clone of the object and all nested objects.
 */

// INTERVIEW QUESTION 1: Pass by Value vs Pass by Reference
let num1 = 10;
let num2 = num1; // Copied by value
num1 = 20;
console.log(num2); // 10 (Independent)

let obj1 = { val: 10 };
let obj2 = obj1; // Copied by reference
obj1.val = 20;
console.log(obj2.val); // 20 (Shared reference)

// INTERVIEW QUESTION 2: Shallow Copying
let original = { a: 1, b: { c: 2 } };

// Using Spread
let shallowSpread = { ...original };
// Using Object.assign
let shallowAssign = Object.assign({}, original);

shallowSpread.a = 99; // Modifies clone only
shallowSpread.b.c = 99; // Modifies BOTH (nested object shares reference)
console.log(original.b.c); // 99

// INTERVIEW QUESTION 3: Deep Copying
// Quick approach using JSON (loses functions, Symbol, undefined)
let deepClone = JSON.parse(JSON.stringify(original));
deepClone.b.c = 500;
console.log(original.b.c); // 99 (Independent)

// Modern built-in deep clone (where supported)
// let deepCloneModern = structuredClone(original);
