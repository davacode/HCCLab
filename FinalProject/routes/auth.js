const express = require('express');
const db = require('../db');
const router = express.Router();
const bcrypt = require('bcrypt');

// Registration
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role || 'user']);
        res.redirect('/login');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login Route
const session = require('express-session');
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = users[0];

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Session
        req.session.user = { user_id: user.user_id, username: user.username, role: user.role };
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
