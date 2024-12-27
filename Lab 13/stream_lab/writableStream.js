const fs = require('fs');

const writableStream = fs.createWriteStream('output.txt');

writableStream.write('This is a sample text written to the file.\n');
writableStream.write('This is another line.\n');

writableStream.on('finish', () => {
    console.log('Writing complete.');
});

writableStream.end();
