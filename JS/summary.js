// This is for practice and test my knowledge

//  refers to the engine's behavior
//  moving variable and function declarations to the top of their respective scopes 
//  (either global or function scope) during the compilation phase, before the code actually executes


/**
 * Hoisting in JS:
 * 1) Creation phase: declarations are registered.
 *    - var: initialized as undefined
 *    - let/const: hoisted but uninitialized (TDZ)
 * 2) Execution phase: code runs line by line and assignments happen
 */


console.log(a); // undefined
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
var a = 10;
const b = 10;


/**
 * == used to compare 1=='1' => true
 * === used to compare with types included 1==='1' => false
 * 
 * Falsy values :
 * undefined : var creatd but not init
 * null : intentional absent of a object => no value    but type(obj) => object
 * NaN : not a number       but type(NaN) => number
 * false : false
 * "" : false
 * 0 : flase
 *  
 */

console.log(typeof(null));
console.log(typeof(NaN));


// ARROW FUNCTOIN VS INLINE
// you can use spread operator on arrow funtions
function sum(...arg) {
    console.log(arg);
}
const s = (...arg) => {
    console.log(arg) // works
}

function mul() {
    console.log(arguments);
}
const m = () => {
    console.log(arguments); // ref error
}

mul(1, 2, 3);
m(1, 2, 3);



// Destructuring
const usr = { name: "abc", age: 23 };
const { name, age } = usr;
const { name: n, age: ag } = usr; // renaming
console.log(name, age); // abc 23
console.log(n, ag); // abc 23

const arr = [3, 4, 5];
const arr1 = [1, 2, ...arr];
console.log(arr1);



// by value and by ref
// copy and clone
// JavaScript is pass-by-value.
// For objects, the value being passed is a reference to the object.

function pr(arg) {
    console.log(arg);
}
// pass by value
const val = 10;
pr(val);

// pass by ref
const emp = {val: 10};
pr(emp);

// deep copy or copy by value
const a1 = 10;
const a2 = a1;


// shallow copy or copy by ref
const o1 = {asd:10};
const o2 = o1;
const o3 = {...o1};
const o4 = {};  Object.assign(o4, o1);

o1.asd = 30;

console.log(o1);        //  30
console.log(o2);        //  30    normal
console.log(o3);        //  10    spread
console.log(o4);        //  10    Object.assign(target, source);





// context

const person = {
    name: "ram",
    sayHi() {
        console.log("Hi, I am ", this.name);
    }
}
const det_hi = person.sayHi;
// const hi2 = person.sayHi(); // Immidately calls the function

person.sayHi();
det_hi();      // losses the context

function seprate_hi(age) {
    console.log("Hi there I'm ", this.name, " and I am ", age);
}

const context = {
    name: "Raman"
}

/**
 * call : comma sep
 * apply : array of arg
 * bind : return funciton
 */

seprate_hi.call(context, 32);                       // call
seprate_hi.apply(context, [32]);                    // apply
const n_seprate_hi = seprate_hi.bind(context);      // bind
n_seprate_hi(32);

// TODO: Custom bind polyfill




// prototype and inheritance

function Animal(name) {
    console.log(this.name);
}

Animal.prototype.speak = function() {
    console.log(this.name, " speaks");
}

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// Inherit prototype
// Dog.prototype = Animal;                          // wrong
Dog.prototype = Object.create(Animal.prototype);    // ✅ Correct
// reset constructor
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    console.log(this.name, " barks " );
}


const d  = new Dog("Rex", "Pug");
d.speak();      // Rex barks


//  Syntax sugar
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    speak() {
        console.log(this.name, " says meow");
    }
}

const c = new Cat("myCat");
c.speak();      //myCat speaks




/**
 * TODO:
 * Yet to learn :
 * closures and lexical env
 * currying and patterns
 * array methods polyfills
 * promisses adn event loop     <= already know this BTW
 */
