// Phase 1: Foundations
// ==========================================
// 01. Type Coercion & Comparisons
// ==========================================

/* THEORY:
 * Type Coercion: JavaScript implicitly converts values from one data type to another.
 * == (Loose Equality): Compares values after attempting to coerce them to the same type.
 * === (Strict Equality): Compares both value and type without coercion.
 */

// INTERVIEW QUESTION 1: Loose vs Strict Equality
console.log(1 == '1');    // true (string '1' is coerced to number 1)
console.log(1 === '1');   // false (different types)

console.log(null == undefined);  // true (special rule in JS)
console.log(null === undefined); // false (different types)

// INTERVIEW QUESTION 2: Falsy Values
// The 6 falsy values in JS: false, 0, '', null, undefined, NaN.
if (!"") {
    console.log("Empty string is falsy");
}

// INTERVIEW QUESTION 3: Tricky Coercions
console.log([] == ![]);   // true 
// Explanation: ![] becomes false. [] == false -> [] == 0 -> "" == 0 -> 0 == 0 -> true.

console.log(typeof null); // "object" (This is a historical bug in JavaScript)
console.log(typeof NaN);  // "number"

// how are these values different from each other?
// and where are they used in real world applications?
// null: Represents the intentional absence of any object value. Used to indicate "no value" or "empty" in objects, databases, etc.
// undefined: Indicates that a variable has been declared but not assigned a value. Commonly used for uninitialized variables or missing function parameters.
// NaN: Stands for "Not-a-Number". Represents an invalid number result from operations like 0/0 or parseInt("abc"). Used to indicate errors in numeric calculations.

// null : no object -> just empty
// undefined : variable is declared but not assigned a value
// NaN : Not a Number -> result of invalid numeric operations