// JavaScript Array Methods Examples

// Sample array to work with
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig'];

// --- 1. map() ---
// Creates a new array by applying a function to each element of the original array.
console.log('--- map() ---');
const doubledNumbers = numbers.map(num => num * 2);
console.log('Original numbers:', numbers);
console.log('Doubled numbers:', doubledNumbers); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
console.log('\n');


// --- 2. filter() ---
// Creates a new array with all elements that pass the test implemented by the provided function.
console.log('--- filter() ---');
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Original numbers:', numbers);
console.log('Even numbers:', evenNumbers); // [2, 4, 6, 8, 10]
console.log('\n');


// --- 3. reduce() ---
// Executes a reducer function on each element of the array, resulting in a single output value.
console.log('--- reduce() ---');
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log('Original numbers:', numbers);
console.log('Sum of numbers:', sum); // 55

const fruitString = fruits.reduce((acc, fruit) => acc + ', ' + fruit);
console.log('Concatenated fruits:', fruitString); // "apple, banana, cherry, date, elderberry, fig"
console.log('\n');


// --- 4. forEach() ---
// Executes a provided function once for each array element. It does not return a new array.
console.log('--- forEach() ---');
console.log('Logging each number:');
numbers.forEach(num => {
    console.log(`Number: ${num}`);
});
console.log('\n');


// --- 5. find() ---
// Returns the first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
console.log('--- find() ---');
const firstEven = numbers.find(num => num % 2 === 0);
console.log('First even number:', firstEven); // 2

const longFruit = fruits.find(fruit => fruit.length > 6);
console.log('First fruit with length > 6:', longFruit); // "elderberry"
console.log('\n');


// --- 6. findIndex() ---
// Returns the index of the first element in the array that satisfies the provided testing function. Otherwise, -1 is returned.
console.log('--- findIndex() ---');
const firstEvenIndex = numbers.findIndex(num => num % 2 === 0);
console.log('Index of first even number:', firstEvenIndex); // 1 (since 2 is at index 1)
console.log('\n');


// --- 7. some() ---
// Tests whether at least one element in the array passes the test implemented by the provided function. Returns a boolean.
console.log('--- some() ---');
const hasEvenNumber = numbers.some(num => num % 2 === 0);
console.log('Does the array have at least one even number?', hasEvenNumber); // true
console.log('\n');


// --- 8. every() ---
// Tests whether all elements in the array pass the test implemented by the provided function. Returns a boolean.
console.log('--- every() ---');
const allNumbersPositive = numbers.every(num => num > 0);
console.log('Are all numbers positive?', allNumbersPositive); // true

const allFruitsLong = fruits.every(fruit => fruit.length > 5);
console.log('Are all fruits longer than 5 characters?', allFruitsLong); // false
console.log('\n');


// --- 9. includes() ---
// Determines whether an array includes a certain value among its entries, returning true or false.
console.log('--- includes() ---');
const hasFive = numbers.includes(5);
console.log('Does the array include 5?', hasFive); // true

const hasMango = fruits.includes('mango');
console.log('Does the array include "mango"?', hasMango); // false
console.log('\n');


// --- 10. slice() ---
// Returns a shallow copy of a portion of an array into a new array object. The original array is not modified.
console.log('--- slice() ---');
const middleNumbers = numbers.slice(3, 7); // Elements from index 3 up to (but not including) index 7
console.log('Original numbers:', numbers);
console.log('Middle numbers (slice(3, 7)):', middleNumbers); // [4, 5, 6, 7]
console.log('\n');


// --- 11. splice() ---
// Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. This method modifies the original array.
console.log('--- splice() ---');
const numbersForSplicing = [10, 20, 30, 40, 50];
console.log('Original array for splicing:', numbersForSplicing);
// Remove 2 elements starting from index 1, and add 21, 22
const removedElements = numbersForSplicing.splice(1, 2, 21, 22);
console.log('Array after splice(1, 2, 21, 22):', numbersForSplicing); // [10, 21, 22, 40, 50]
console.log('Removed elements:', removedElements); // [20, 30]
console.log('\n');


// --- 12. sort() ---
// Sorts the elements of an array in place and returns the sorted array. The default sort order is built upon converting the elements into strings.
console.log('--- sort() ---');
const unsortedNumbers = [4, 2, 5, 1, 3, 10];
console.log('Unsorted numbers:', unsortedNumbers);
// For numbers, you need to provide a compare function.
unsortedNumbers.sort((a, b) => a - b); // Ascending order
console.log('Sorted numbers (ascending):', unsortedNumbers); // [1, 2, 3, 4, 5, 10]

const unsortedFruits = ['date', 'apple', 'fig', 'cherry'];
console.log('Unsorted fruits:', unsortedFruits);
unsortedFruits.sort(); // Sorts alphabetically
console.log('Sorted fruits:', unsortedFruits); // ["apple", "cherry", "date", "fig"]
console.log('\n');
