const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'CMS',
});

const db = pool.promise();

module.exports = db;
