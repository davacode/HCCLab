const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/register', (req, res) => {
    res.render('registration');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        const user = req.session.user;
        res.render('dashboard', { user });
    }
    else {
        res.redirect('/login');
    }
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {

        if (err) {
            console.log("Password hashing error: ", err);
            return res.redirect('/register');
        }

        const insertQuery = "INSERT INTO users (username,password) VALUES (?,?)";
        db.query(insertQuery, [username, hash], (err, result) => {
            if (err) {
                console.err("Database insert error: ", err);
                res.redirect('/register');
            }
            res.redirect('/login');
        });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const selectQuery = "SELECT * FROM users WHERE username = ?";
    db.query(selectQuery, [username], (err, result) => {
        if (err) {
            console.error("Error retrieving the user: ", err);
            return res.redirect('/login');
        }
        if (result.lenght === 0) {
            return res.redirect('/login');
        }

        const user = result[0];
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                req.session.user = user;
                res.redirect('/dashboard');
            }
            else {
                res.redirect('/login');
            }
        })
    });
});

module.exports = router;