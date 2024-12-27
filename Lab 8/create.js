const mysql = require('mysql');
const prompt = require('prompt-sync')();

// connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'students'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connection to database successful!');
    const firstName = prompt('Enter first name: ');
    const lastName = prompt('Enter last name: ');
    const email = prompt('Enter email: ');
    const grade = prompt('Enter grade: ');

    const insertQuery = `INSERT INTO student_records (first_name, last_name, email, grade)
                 VALUES (?, ?, ?, ?)`;

    connection.query(insertQuery, [firstName, lastName, email, grade], (err, result) => {
        if (err) throw err;
        console.log('New student record inserted successfully!');
        connection.end();
    });
});
