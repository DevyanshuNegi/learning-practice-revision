

running js code we have 2 phases

- Memory phase
	- declaration
- Code phase
	- initialization





### Core Components

When the GEC is created, it automatically sets up three fundamental things: 
- **Global Object:** 
	- In a browser, this is the `window` object;
	- in Node.js, it is the `global` object.
- **`this` Binding:** 
	- `this` points directly to the Global Object.
- **Outer Reference:** 
	- Since GEC is the outermost level, its reference to an outer environment is `null`. 


### Two Phases of Execution

The GEC, like all execution contexts, runs in two distinct stages:
1. **Creation Phase (Memory Phase):**
    - The engine scans the code and allocates memory for variables and functions.
    - **Hoisting occurs here:**

2. **Execution Phase (Code Phase):**
    - The engine executes the code line-by-line from top to bottom.
    - It assigns actual values to variables and invokes functions.
    - When a function is called, a new **Function Execution Context** is created and pushed onto the **Call Stack**. 

Lifecycle & Call Stack

- **Initialization:** The GEC is the first item pushed onto the [Call Stack]
- **Persistence:** It remains at the bottom of the stack throughout the program's life.
- **Termination:** The GEC is only popped off the stack and destroyed once all code has been executed and the program finishes (e.g., when the browser tab is closed).


This all this is deleted

![[Pasted image 20260402091231.png]]

![[Pasted image 20260402091828.png]]

when encounter a function
put full body in the mem area.


![[Pasted image 20260402092022.png]]

this way, global function is undefined over there
and only get the real value when it reaches the line.


[[Hoisting]]
  
![[Pasted image 20260402092648.png]]


Let and const also get hoisted but does not get value due to TDZ temporal dead zone

