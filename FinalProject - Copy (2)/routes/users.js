const express = require('express');
const db = require('../db');
const router = express.Router();
const bcrypt = require('bcrypt');

// Add User
router.get('/add', (req, res) => {
    res.render('users/add'); 
});
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

// List
router.get('/list', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.render('users/list', { users: rows }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Edit 
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length > 0) {
            res.render('users/edit', { user: rows[0] });
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
            res.redirect('/users/list');
        } else {
            res.status(404).send('Update failed');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length > 0) {
            res.render('users/delete', { user: rows[0] });
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
            res.redirect('/users/list');
        } else {
            res.status(404).send('User not found or deletion failed');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
