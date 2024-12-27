// javascript
const fs = require('fs');

function saveStudentData(firstName, lastName, email) {
    
    const studentInfo = `STUDENT DATA\n ============\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\n`;


    fs.appendFile('studentData.txt', studentInfo, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Student data saved successfully.');
        }
    });
}

saveStudentData('Anthony', 'Davalos', 'w208322926@student.hccs.edu');


fs.readFile('studentData.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});