// Phase 3: Advanced Functions
// ==========================================
// 08. Currying & Patterns
// ==========================================

/* THEORY:
 * Currying transforms a function f(a,b,c) into callable f(a)(b)(c).
 * Used for function composition and partial application.
 */

// INTERVIEW QUESTION 1: Basic Currying
function add(a) {
    return function(b) {
        if (b) return add(a + b); 
        return a;
    };
}

console.log(add(1)(2)()); // 3
console.log(add(1)(2)(3)(4)()); // 10


// INTERVIEW QUESTION 2: Debounce Execution Pattern
// Limits the rate a function fires. It waits for N ms of inactivity before firing.
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId); // Clear old timer
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// simulate basic DOM usage trigger
const handleSearch = debounce(() => console.log('Searching API...'), 300);
// handleSearch() will only run when user stops typing for 300ms.


// INTERVIEW QUESTION 3: Throttle Execution Pattern
// Limits execution to be AT MOST once every N ms.
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            // unlock after limit
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const handleScroll = throttle(() => console.log('Scrolling...'), 500);
// handleScroll() runs instantly, but then ignores calls until 500ms elapse.
