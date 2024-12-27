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

    const lastName = prompt('Enter the last name of the student to update: ');
    const checkSql = 'SELECT * FROM student_records WHERE last_name = ?';
    connection.query(checkSql, [lastName], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const newGrade = prompt(`Enter the new grade for ${results[0].first_name} ${results[0].last_name}: `);
            const updateSql = 'UPDATE student_records SET grade = ? WHERE last_name = ?';
            connection.query(updateSql, [newGrade, lastName], (err, result) => {
                if (err) throw err;
                console.log('Student grade updated successfully!');
                connection.end();
            });
        } else {
            console.log('No student found with that last name.');
            connection.end();
        }
    });
});
