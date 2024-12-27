//Start of app.js file
require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

const router = require('./routes/users');
app.use('/', router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

//end of app.js file