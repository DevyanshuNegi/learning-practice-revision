// Phase 4: Async Engine
// ==========================================
// 10. Promises & Event Loop
// ==========================================

/* THEORY:
 * Event Loop executes Call Stack first, then Microtask Queue (Promises), then Macrotask Queue (setTimeout).
 * Promise has 3 states: Pending, Fulfilled, Rejected.
 */

// INTERVIEW QUESTION 1: Event Loop Execution Order
console.log("1. Start"); 

setTimeout(() => {
    console.log("4. SetTimeout (Macrotask)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Promise (Microtask)");
});

console.log("2. End");

/* 
Output:
1. Start (Sync)
2. End (Sync)
3. Promise (Microtask)
4. SetTimeout (Macrotask)
*/


// INTERVIEW QUESTION 2: Build a Polyfill for Promise.all
// Promise.all resolves when ALL promises resolve, or rejects when ANY ONE rejects.

function myPromiseAll(promisesArray) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completedCount = 0;

        if (promisesArray.length === 0) return resolve(results);

        promisesArray.forEach((promiseContent, index) => {
            // Wrap in Promise.resolve to handle plain values (e.g. 42 instead of a Promise)
            Promise.resolve(promiseContent)
                .then(value => {
                    results[index] = value; // Maintain order
                    completedCount++;
                    
                    if (completedCount === promisesArray.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    reject(error); // Reject completely if one fails
                });
        });
    });
}

// Test myPromiseAll
const p1 = Promise.resolve("A");
const p2 = 42; // plain value
const p3 = new Promise(resolve => setTimeout(() => resolve("B"), 100));

myPromiseAll([p1, p2, p3]).then(console.log); // ["A", 42, "B"]
