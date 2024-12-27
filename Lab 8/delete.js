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
    const lastName = prompt('Enter the last name of the student to delete: ');

    const checkSql = 'SELECT * FROM student_records WHERE last_name = ?';
    connection.query(checkSql, [lastName], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const confirmation = prompt(`Are you sure you want to delete ${results[0].first_name} ${results[0].last_name}? (yes/no): `);
            if (confirmation === 'yes') {
                const deleteSql = 'DELETE FROM student_records WHERE last_name = ?';
                connection.query(deleteSql, [lastName], (err, result) => {
                    if (err) throw err;
                    console.log('Student record deleted successfully!');
                    connection.end();
                });
            } else {
                console.log('Deletion canceled.');
                connection.end();
            }
        } else {
            console.log('No student found with that last name.');
            connection.end();
        }
    });
});
