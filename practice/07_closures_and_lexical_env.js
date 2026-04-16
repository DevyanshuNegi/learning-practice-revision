// Phase 3: Advanced Functions
// ==========================================
// 07. Closures & Lexical Environment
// ==========================================

/* THEORY:
 * Closure: A function bundled together with references to its surrounding state (lexical environment). 
 * It gives you access to an outer function's scope from an inner function, even after the outer function has returned.
 */

// INTERVIEW QUESTION 1: Basic Closure for Data Privacy
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment() { count++; return count; },
        decrement() { count--; return count; },
        value() { return count; }
    };
}
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.value());     // 1
console.log(counter.count);       // undefined (private)

// INTERVIEW QUESTION 2: Loops and Closures
// Problem: var is function-scoped. It prints 3, 3, 3
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        // console.log("var loop:", i); 
    }, 100);
}

// Solution 1: Use let (Block Scope creates a new lexical environment per iteration)
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log("let loop:", j); // 0, 1, 2
    }, 100);
}

// Solution 2: Use IIFE to capture the value
for (var k = 0; k < 3; k++) {
    (function(capturedK) {
        setTimeout(() => {
            console.log("IIFE loop:", capturedK); // 0, 1, 2
        }, 100);
    })(k);
}
