const EventEmitter = require('events');
const prompt = require('prompt-sync')();

const eventEmitter = new EventEmitter();

const myName = 'Anthony'; 

eventEmitter.on('greet', (name) => {
    if (name === myName) {
        console.log(`Hello, ${name}`);
    } else {
        console.log('Hello');
    }
});

eventEmitter.once('respond', (text) => {
    if (text === 'lock') {
        console.log('I am locked');
    } else {
        console.log(text);
    }
});

const userName = prompt('Enter your name: ');

eventEmitter.emit('greet', userName);

const userText = prompt('Enter any word or type "lock": ');
eventEmitter.emit('respond', userText);