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

    const action = prompt('Do you want to view all records or search by last name? (all/search): ');

    if (action === 'all') {
        const sql = 'SELECT * FROM student_records';
        connection.query(sql, (err, results) => {
            if (err) throw err;
            console.log(results);
            connection.end();
        });
    } else if (action === 'search') {
        const lastName = prompt('Enter the last name: ');
        const sql = 'SELECT * FROM student_records WHERE last_name = ?';
        connection.query(sql, [lastName], (err, results) => {
            if (err) throw err;
            console.log(results);
            connection.end();
        });
    } else {
        console.log('Invalid action.');
        connection.end();
    }
});
