// JavaScript source code
const { Transform } = require('stream');
const fs = require('fs');

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

const readableStream = fs.createReadStream('input.txt', { encoding: 'utf8' });

const writableStream = fs.createWriteStream('output.txt');

readableStream.pipe(upperCaseTransform).pipe(writableStream);

writableStream.on('finish', () => {
    console.log('Data transformed and written to output.txt');
});
