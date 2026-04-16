
/**
 * TDZ : temp dead zone
 * Hoisting: JS moves declarations (not initializations) to the top of their scope during compile phase.
 * Scope: Where variables are accessible.
 *   - var: Function or global scoped.
 *   - let/const: Block scoped.
 * Temporal Dead Zone (TDZ): Time between entering block scope and variable declaration for let/const.
 */

// ====== null ======

// und = not init
// null = no val / empty object
// NaN = not a number
// [] = false
// "" = false

//  type of und null => object
//  type of nan => number



//      Objects create deep copy by default

//  Deep copy = real copy
//  for shalow copy objects we use          Object.assign({})
var user3 = Object.assign(user);




// Old way of creating a class

function User() {
    this.name="ram";
    this.age=20;
    this.display = function() {
        console.log(this.name, this.age);
    };
}

var user1 = new User();
console.log(user1); 
user1.display();

// New way of creating class
class User {
    constructor(name) {
        this.name = name;
    }
    display() {
        console.log("in display");
    }
}
var user1 = new User();
console.log(user1);
user1.display();



