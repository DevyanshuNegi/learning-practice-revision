// Phase 3: Advanced Functions
// ==========================================
// 09. Array Methods Polyfills
// ==========================================

/* THEORY:
 * Polyfills provide modern functionality on older browsers.
 * map, filter, and reduce are Higher-Order Array Methods that don't mutate the original array.
 */

const arr = [1, 2, 3];

// INTERVIEW QUESTION 1: Polyfill for Array.map
Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        // this[i] = item, i = index, this = array
        result.push(callback(this[i], i, this));
    }
    return result;
};

const doubled = arr.myMap(num => num * 2);
console.log("myMap:", doubled); // [2, 4, 6]


// INTERVIEW QUESTION 2: Polyfill for Array.filter
Array.prototype.myFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

const evens = arr.myFilter(num => num % 2 === 0);
console.log("myFilter:", evens); // [2]


// INTERVIEW QUESTION 3: Polyfill for Array.reduce
Array.prototype.myReduce = function(callback, initialValue) {
    // Determine start condition based on initial value
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    let startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};

const sum = arr.myReduce((acc, curr) => acc + curr, 0);
console.log("myReduce sum:", sum); // 6
