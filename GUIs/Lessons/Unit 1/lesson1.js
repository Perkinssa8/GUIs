console.log("Hello, world!");

const PI = 3.14159;
const small =0.00001;
const result = 10/7;
const age = 25;
const myName = "Sam";
const combined = "My name is "+ myName + " and my age is " + age + ".";
const betterCombined = `My name is ${myName} and my age is ${age}.`;
const myBool = true

console.log(result);
console.log(betterCombined);

// arrays and objects
const values = [1,2,3,4,5];
console.log(values);
values.push(10);
console.log(values);
console.log(values.length);
values.pop();
console.log(values);
values.shift();
console.log(values);
console.log(values[3]); // prints the 4th value in array


//objects
const person = {
    name:"Joseph",
    age: 30,
    occupation: "Professor",
};

console.log(person.name); // or do
const key = "name";
console.log(person["name"]);
console.log(person.key);

person.address = "1111 Old main Hill";
console.log(person); // will now have an address


// null objects: null and undefined
function find(data, num) {
    if (data.indexOf(num) >=0) {
        return data[data.indexOf(num)]
    }
    return null
};
const aNullvalue = null;
const anUndefined = undefined;

console.log(person.height); // will print 'undefined'
console.log(find([1,2,3,4,5], 2)); // will print null

console.log(find([11,22,33,44,55],4))
// const a = 10;
// a.someattr = "Test";
// console.log(a.someattr);

const a = "Some String";
a.someattr = "Test";
console.log(a.someattr);

// boolean operators:
const value1 = true;
const value2 = false;
const age1 = 30
const target = "30"

if (value1 && value2) {
    console.log("expression is true");
} else {
    console.log("expression is false");
}

if (value1 || value2) {
    console.log("expression is true");
} else {
    console.log("expression is false");
}

if (age1 === target) {
    console.log("expression is true");
} else {
    console.log("expression is false");
}

if (age == target){
    console.log("expression is true");
} else {
    console.log("expression is false");
}

if (!!"hello" && !!"" && true){
    console.log("expression is true");
} else {
    console.log("expression is false");
}

console.log(`All values except falsey values are true \n The && and || are operators. 
            \n && returns either the value of the first falsy operand it finds or the 
            value of the last operand if all values are truthy \n `);

console.log(`The logical operator OR (||) returns the value of the first truthy operand it finds or the value of the last operand if all values are falsy`);
// booleans for false: null,0n, undefined, NaN, "",-0, 0 | for true: "string", number. ALWAYS use the triple ===


// Loops
const numbers = [1,2,34,432,432,4,5,6,45,6,765,45,3,4];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) console.log(numbers[i])
}

// using 'in' vs using 'of' 
for (const value of numbers) {
    if (value %  2 === 0) console.log(value);
}

for (let b of numbers) {
    console.log(b);
}

// while loops
const queue = ["Joseph", "Catelyn", "Sophi"];

while (queue.length !==0) {
    const person = queue.shift();
    // if (person === "Joseph")
    //     console.log("we broke out of the loop at Joseph")
    //     break;
    if (person === "Catelyn") {
        console.log("We skip Catelyn, but empty the queue"); 
        continue;
    }
    console.log(person);
}


