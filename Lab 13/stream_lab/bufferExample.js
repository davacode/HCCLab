// JavaScript source code


const fs = require('fs');

fs.readFile('image.jpg', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('Buffer contents:', data);
});
