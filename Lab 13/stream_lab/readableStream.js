// JavaScript source code


const fs = require('fs');

const readableStream = fs.createReadStream('input.txt', { encoding: 'utf8' });

readableStream.on('data', (chunk) => {
    console.log('New chunk:', chunk);
});

readableStream.on('end', () => {
    console.log('Finished reading the file.');
});

readableStream.on('error', (err) => {
    console.error('Error reading the file:', err);
});

