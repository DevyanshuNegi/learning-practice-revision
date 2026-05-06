==mechanism that the JavaScript engine uses to keep track of function execution==


![[Pasted image 20260402095408.png]]


### 1. Microtask Queue (High Priority)

This queue is for "small" tasks that must execute immediately after the current script finishes, but before the browser/environment moves on to any other processing. 

- **Promises:** Specifically the callbacks inside `.then()`, `.catch()`, and `.finally()`.
- **Async/Await:** The code following an `await` keyword.
- **queueMicrotask():** A dedicated Web API for manually adding tasks here.
- **MutationObserver:** Browser API used to watch for changes in the 
- **process.nextTick():** (Node.js only) This actually has its own even higher-priority queue that executes before other microtasks. 

### 2. Macrotask Queue (Lower Priority)

This queue handles larger, distinct tasks. The event loop picks only **one** macrotask from this queue at a time, then goes back to check if any new microtasks were added before picking the next macrotask. 
- **Timers:** Callbacks from `setTimeout()` and `setInterval()`.
- **I/O Operations:** Network requests (like `fetch` callbacks), file system tasks, or database queries.
- **UI Rendering & Events:** User interactions like `click`, `scroll`, or mouse movements.
- **setImmediate():** (Node.js specific) Executes after the current I/O phase.
- **MessageChannel/postMessage:** APIs used for communication between different ]

Summary of Execution Order

1. **Call Stack:** Synchronous code executes first.
2. **Microtasks:** Once the stack is empty, the engine clears the _entire_ Microtask Queue.
3. **Macrotask:** The engine picks the first Macrotask from the queue.
4. **Repeat:** After that single macrotask, it returns to Step 2 to check for microtasks again. 

- **Initialization:** The GEC is the first item pushed onto the [Call Stack]