//Sam Perkins; A02254025; Assignment 1: Data Processing

// Figs Unlimited


// to ensure I fulfill the requirement to not modify the original data, I will create a new array and push the values

const transactionsCopy = [...transactions];
const customersCopy = [...customers];


// 1. How many invalid transactions are there in the dataset?
function filter (data, predicate) {
  const invalid = [];
  for (const num of data) {
    if (predicate(num)) invalid.push(num);
  }
  return invalid;
}

const invalidTransaction = filter(transactionsCopy, num => !!num.amount === false || num.product === "data-corrupted");
console.log(`Number of invalid transactions: ${invalidTransaction.length}`); 

// 2. How many duplicate customers are there?
function pairIf (data1, data2, predicate) {
  const pairs = [];
  for (const num of data1) {
    for (const num2 of data2) {
      if (predicate(num, num2)) pairs.push([num, num2]);
    }
  }
  return pairs;
}

const duplicateCustomers = pairIf(customersCopy, customersCopy, (num, num2) => num.id !== num2.id && num.emailAddress === num2.emailAddress);
console.log(`Number of duplicate customers: ${duplicateCustomers.length/2}`);


// 3. How much was the most recent transaction that was over $200 total?
function findLast (data, predicate) {
  for (let i = data.length - 1; i >= 0; i--) {
    if (predicate(data[i])) return data[i];
  }
  return null;
}

const recentOver200 = findLast(transactionsCopy, i => i.amount > 200);
console.log(`Amount of the most recent transaction over $200: ${recentOver200.amount}`);

// 4. How many small, medium, and large transactions are there?
function reduce (data, reducer, initialValue) {
  let accumulator = initialValue;
  for (const num of data) {
    accumulator = reducer(accumulator, num);
  }
  return accumulator;
}

const small = reduce(transactionsCopy, (acc, num) => num.amount < 25 && !!num.amount && num.product !== "data-corrupted" ? acc + 1 : acc, 0);
const medium = reduce(transactionsCopy, (acc, num) => num.amount >= 25 && num.amount < 75 && num.product !== "data-corrupted"? acc + 1 : acc, 0);
const large = reduce(transactionsCopy, (acc, num) => num.amount >= 75 && num.product !== "data-corrupted" ? acc + 1 : acc, 0);

console.log(`Number of small transactions: ${small}`);
console.log(`Number of medium transactions: ${medium}`);
console.log(`Number of large transactions: ${large}`);

// 5. Which customers have at least one transaction over $200?
function map (data, callback) {
  const mapped = [];
  for (const num of data) {
    mapped.push(callback(num));
  }
  return mapped;
}


const transOver200 = filter(transactionsCopy, num => num.amount > 200);
const whichCustomer = pairIf(customersCopy, transOver200, (num, num2) => num.id === num2.customerId);
const customerOver200 = reduce(whichCustomer, (acc, num) =>  {
  if (!acc.includes(num[0])) {
    acc.push(num[0])}; return acc
}, []);
console.log(`Customers with at least one transaction over $200: ${JSON.stringify(customerOver200, null, 2)}`);
// Please note I originally left line 83 to output as an array of [object Object]s, but was taught how to use JSON.stringify to make it more readable
const names200 = map(customerOver200, num => {concat = num.firstName + " " + num.lastName + "\n"; return concat});
console.log(`Customers with at least one transaction over $200: ${names200}`);
console.log(`Number of customers with at least one transaction over $200: ${customerOver200.length}`);