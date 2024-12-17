// JavaScript source code
const fs =require('fs');

// file path and content
const filePath = 'newFile.txt';
const fileContent = ' This is the content of the new file.'

//Create the file
fs.writeFile(filePath, fileContent), (err) => {
    if(err){
        console.error(`Error creating the file: ${err}`);
    } else {
        console.log('File created successfully.');
    }
});