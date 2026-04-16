// Phase 2: Memory & Context
// ==========================================
// 06. Prototypes & Inheritance
// ==========================================

/* THEORY:
 * JavaScript uses Prototypal Inheritance. Every object has an internal `[[Prototype]]` link (accessible via `__proto__`). 
 * When trying to access an object's property, JS checks the object, then its prototype, and so on up the prototype chain until it reaches `null`.
 */

// INTERVIEW QUESTION 1: Prototype Chain Basics
const arr = [1, 2, 3];
// arr -> Array.prototype -> Object.prototype -> null

// INTERVIEW QUESTION 2: Prototypal Inheritance (Before ES6 Classes)
function Animal(name) {
    this.name = name;
}

// Adding method to prototype, so all instances share the same function block
Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};

function Dog(name, breed) {
    Animal.call(this, name); // Call parent constructor
    this.breed = breed;
}

// Inherit prototype
Dog.prototype = Object.create(Animal.prototype);
// Reset constructor reference
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    console.log(`${this.name} barks.`);
};

const d = new Dog("Rex", "Pug");
d.speak(); // "Rex barks."

// INTERVIEW QUESTION 3: ES6 Class syntax (Syntax sugar over Prototypes)
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    speak() {
        console.log(`${this.name} meows.`);
    }
}
const c = new Cat("Whiskers");
c.speak(); // "Whiskers meows."
