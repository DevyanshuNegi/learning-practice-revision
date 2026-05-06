
==JavaScript behavior where the interpreter appears to move declarations of functions, variables, and classes to the top of their scope before the code is executed==

![[Pasted image 20260402092652.png]]

let and const get hosted but cannot be accessed due to TDZ temporal dead zone


Comparison Table

| Type                     | Hoisted? | Initial Value          | Early Access Result          |
| ------------------------ | -------- | ---------------------- | ---------------------------- |
| **Function Declaration** | Yes      | Full function body     | Works normally               |
| **`var`**                | Yes      | `undefined`            | Returns `undefined`          |
| **`let` / `const`**      | Yes      | Uninitialized          | `ReferenceError`             |
| **Function Expression**  | No*      | `undefined` (if `var`) | `TypeError` (not a function) |

_*The variable name is hoisted if using `var`, but the function assignment itself is not._ 