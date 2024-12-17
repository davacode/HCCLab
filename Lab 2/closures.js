// JavaScript source code
// Alert message gunction
function createMessageFunction() {
    const message = "Hello, This is a Message.";
    return function () {
        alert(message);
    }
};
// gives function to button
const showMessage = createMessageFunction();
document.getElementById('showMsgBtn').addEventListener('click', showMessage);

//arry of numbers function
const numbers = [1, 2, 3, 4, 5];
const squareNumbers = numbers.map(number => number * number);
console.log(squareNumbers);
