// functions
function sayHello(name) {
    console.log(`Hello , ${name}`);
}

function double(num) {
    return num * 2;
}

// first class functions
const myFunc = sayHello;

myFunc("Sam"); // I can call myFunc just like sayHello

// alternate declarations
const triple = function(num) { // I could also write function myFunc(num) { return num * 3; } instead to name the function
    return num * 3;
}; //convention is to not put a semicolon at the end of a function declaration, unless its assigned to a variable

//arrow functions (lambda functions)
const quadruple = (num) => { // you can omit the parentheses if there is only one parameter
    return num * 4;
}

//shorter arrow functions: if a function has only one statement, you can omit the curly braces and the return keyword
const quadruple2 = num => num * 4;

//higher order functions
const nums = [1,3,5,8,9,13,23,26,27,53];

function findFirstEven(data) {
    for (let i = 0; i < data.length; i++) { // for (const num of nums)...
        if (data[i] % 2 === 0) {
            return data[i];
        }
    }
    return null;
}

console.log(findFirstEven(nums));

function find(data, predicate) {
    for (const num of nums) { 
        if (predicate(num)) return num;
        }
    return null;
}

console.log(find(nums, num => num % 2 === 0)); // prints 26
console.log(find(nums, num=> num === 6)); // prints null
// using the find function and the arrow function is called a higher order function

// The spread operator
const person = ["Sam", 25, "Biological Engineer"];

function displayPerson(name, age, occupation) {
    console.log(`Name: ${name}, Age: ${age}, Occupation: ${occupation}`);
}

displayPerson(person[0], person[1], person[2]); // a hassle to call attributes of person
displayPerson(...person); // spread operator will spread the array into individual arguments

const personCopy = [...person]; // will copy the array into a new array you can do it with objects too

function testArguments() {
    console.log(arguments);
} // can take any number of arguments, but it doesn't work in lambda/arrow functions

const testArgs2 = (...args) => {
    console.log(args);
} // this will work in arrow functions

// Example of a callback function
function printHello(name) {
    console.log(`Hello, ${name}`);
}

function printGoodbye() {
    console.log("Goodbye");
    debugger;
}

function delay(callback, amount) {
    return (...arg) => {
        setTimeout(() => callback(...arg), amount);
    };
}

const delayedHello = delay(printHello, 1000);
const delayedGoodbye = delay(printGoodbye, 2000);

// Currying functions
//const _ = require('lodash'); // import lodash library
const myWeirdFunction = (value1) => (value2) => (value3) => value1*value2*value3;
console.log(myWeirdFunction(1)); // prints
console.log(myWeirdFunction(1)(2)); // prints
console.log(myWeirdFunction(2)(3)(4)); // prints 24

// function curry(f) {
//     return function(a) {
//         return function(b) {
//             return f(a,b);
//         };
//     };
// }

// function sum(a,b) {
//     return a + b;
// }

// let curriedSum = curry(sum);

// alert(curriedSum(1)(2)); // 3; curry(func) is a wrapper around function(a) that returns another wrapper function(b) that passes the call to func

// let curriedSumAdvanced = _.curry(sum); // using lodash library
// alert(curriedSumAdvanced(1,2)); // 3, still works normally
// alert(curriedSumAdvanced(1)(2)); // 3, now with currying

// function log(date, importance, message) {
//     console.log(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
// }

// const date = {
//     day: "1/21/2024",
//     Time: "12:45",
//     getHours: function() {
//         return this.Time.split(":")[0];
//     },
//     getMinutes: function() {
//         return this.Time.split(":")[1];
//     },
// }

// log = _.curry(log);
const insertAt = (list, index, value) => [...list.slice(0,index), value, ...list.slice(index)]; // insertAt([1,2,3], 1, 5) => [1,5,2,3]
const myList = [1,2,3,4,5];
const result = insertAt(myList, 2, 35);
console.log(result);
console.log(myList);

// Debugging

const func = () => "Hello World";
const result2 = func();

const data = [1,2,3,4,5,6];
const b = (value) => value % 2 === 0;

function a(data, b) {
    for (const value of data) {
        if (b(value)) return value;
    }
}


