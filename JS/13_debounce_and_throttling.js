// Phase 3: Advanced Functions
// ==========================================
// 11. Debounce & Throttling
// ==========================================

/* THEORY:
 * Debounce and Throttling are techniques to control how many times a function is executed.
 * They are often used for performance optimization with events that can fire rapidly, like resizing a window, scrolling, or typing in an input.
 *
 * Debounce: Groups a sequence of calls into a single one. The function is only called after a certain period of inactivity.
 *   - Use Case: Search bar suggestions. You only want to fetch results after the user has stopped typing.
 *
 * Throttle: Ensures a function is executed at most once every specified period.
 *   - Use Case: Handling scroll events. You might want to update a "scroll to top" button's visibility, but not on every single pixel scrolled.
 */

// ==========================================
// DEBOUNCE IMPLEMENTATION
// ==========================================

/**
 * Creates a debounced function that delays invoking `func` until after `delay` milliseconds have elapsed
 * since the last time the debounced function was invoked.
 *
 * @param {Function} func The function to debounce.
 * @param {number} delay The number of milliseconds to delay.
 * @returns {Function} Returns the new debounced function.
 */
function debounce(func, delay) {
    let timeoutId;

    // The returned function is a closure, so it has access to the `timeoutId` variable.
    return function(...args) {
        // `this` context and arguments are captured.
        const context = this;

        // Clear the previous timeout to reset the delay period.
        clearTimeout(timeoutId);

        // Set a new timeout.
        timeoutId = setTimeout(() => {
            // When the timeout completes, call the original function with the captured context and arguments.
            func.apply(context, args);
        }, delay);
    };
}

// --- Debounce Example Usage ---
/*
To test this in a browser:
1. Create an index.html file.
2. Add: <input type="text" id="searchInput" placeholder="Search here...">
3. Link this script file.
4. Uncomment the code below.

const searchInput = document.getElementById('searchInput');

const fetchSuggestions = (query) => {
    console.log(`Fetching suggestions for: "${query}"`);
    // In a real app, you would make an API call here.
};

// Create a debounced version of our fetch function with a 300ms delay.
const debouncedFetch = debounce(fetchSuggestions, 300);

// Attach the event listener to the input.
searchInput.addEventListener('input', (e) => {
    debouncedFetch(e.target.value);
});
*/


// ==========================================
// THROTTLE IMPLEMENTATION
// ==========================================

/**
 * Creates a throttled function that only invokes `func` at most once per every `limit` milliseconds.
 *
 * @param {Function} func The function to throttle.
 * @param {number} limit The number of milliseconds to throttle invocations to.
 * @returns {Function} Returns the new throttled function.
 */
function throttle(func, limit) {
    let inThrottle;
    let lastResult;

    return function(...args) {
        const context = this;

        if (!inThrottle) {
            inThrottle = true;

            setTimeout(() => {
                inThrottle = false;
            }, limit);

            lastResult = func.apply(context, args);
        }
        return lastResult;
    };
}


// --- Throttle Example Usage ---
/*
To test this in a browser:
1. Make sure your index.html has enough content to be scrollable.
2. Link this script file.
3. Uncomment the code below.

const handleScroll = () => {
    console.log('Scroll event handled!');
    // Perform some expensive calculation or DOM manipulation here.
};

// Create a throttled version of our scroll handler, allowing it to run at most once every 1000ms.
const throttledScrollHandler = throttle(handleScroll, 1000);

// Attach the event listener to the window.
window.addEventListener('scroll', throttledScrollHandler);
*/



//  Easier implimentation
function simpleDebounce(func, delay) {
    let timer;
    return () => {
        clearTimeout(timer);           // Clear previous timer
        timer = setTimeout(func, delay); // Start a new timer
    }
}
function simpleThrottle(func, limit) {
    let waiting = false;
    return () => {
        if (!waiting) {
            func();                    // Run the function
            waiting = true;            // Block future calls
            setTimeout(() => {
                waiting = false;       // Unblock after time limit
            }, limit);
        }
    }
}