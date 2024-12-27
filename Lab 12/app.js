// app.js
const mathOperations = require('./mathOperations');
const stringUtilities = require('./stringUtilities');

const a = 10;
const b = 5;

console.log(`Add: ${mathOperations.add(a, b)}`);
console.log(`Subtract: ${mathOperations.subtract(a, b)}`);
console.log(`Multiply: ${mathOperations.multiply(a, b)}`);
console.log(`Divide: ${mathOperations.divide(a, b)}`);


const sentence = "hello world from node.js";
console.log(`Capitalized: ${stringUtilities.capitalizeWords(sentence)}`);