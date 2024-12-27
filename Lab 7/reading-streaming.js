const fs = require('fs');
const { encode } = require('punycode');

let wordCount = 0;

const readStream = fs.createReadStream('lorem.txt', { encoding: 'utf8' });

readStream.on('data', (chunk) => {
    const words = chunk.split(/\s+/);
    wordCount += words.length;
});

readStream.on('end', () => {
    console.log(`Word Count: ${wordCount}`);
});

readStream.on('error', (err) => {
    console.error('Error reading the file:', err);
});