// JavaScript source code
const fs = require('fs');

const readableStream = fs.createReadStream('input.txt', { encoding: 'utf8' });

const writableStream = fs.createWriteStream('output.txt');

readableStream.pipe(writableStream);

writableStream.on('finish', () => {
    console.log('Pipe operation complete.');
});
