const express = require('express');
const db = require('../db');
const router = express.Router();
const bcrypt = require('bcrypt');

// Registration
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        // Check if username already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
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
        // Find the user
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = users[0];

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Set session
        req.session.user = { user_id: user.user_id, username: user.username, role: user.role };
        res.redirect('/dashboard'); // Redirect to a protected route
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to display the 'Add User' form
router.get('/add', (req, res) => {
    res.render('users/add'); 
});

// Create a new user with a hashed password
router.post('/add', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const [result] = await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
        res.status(201).redirect('/users/list'); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.render('users/list', { users: rows }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length > 0) {
            res.render('users/edit', { user: rows[0] }); // Pass the user data to the template
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { username, role } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE users SET username = ?, role = ? WHERE user_id = ?',
            [username, role, id]
        );
        if (result.affectedRows > 0) {
            res.redirect('/users/list'); // Redirect to the list of users or another page
        } else {
            res.status(404).send('Update failed');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Delete a user
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length > 0) {
            res.render('users/delete', { user: rows[0] }); // Pass the user data to the template
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.redirect('/users/list'); // Redirect to the list of users after deletion
        } else {
            res.status(404).send('User not found or deletion failed');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
