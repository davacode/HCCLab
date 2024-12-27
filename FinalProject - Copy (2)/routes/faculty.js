const express = require('express');
const db = require('../db');
const router = express.Router();

// adding new faculty
router.post('/add', async (req, res) => {
    const { first_name, last_name, email } = req.body;
    try {
        const [result] = await db.query('INSERT INTO faculty (first_name, last_name, email) VALUES (?, ?, ?)', [first_name, last_name, email]);
        res.status(201).redirect('/faculty/list');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/add', (req, res) => {
    res.render('faculty/add');
});

//  listing 
router.get('/list', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM faculty');
        res.render('faculty/list', { faculty: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// editing
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM faculty WHERE faculty_id = ?', [id]);
        if (rows.length > 0) {
            res.render('faculty/edit', { faculty: rows[0] });
        } else {
            res.status(404).send('Faculty member not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    try {
        const [result] = await db.query('UPDATE faculty SET first_name = ?, last_name = ?, email = ? WHERE faculty_id = ?', [first_name, last_name, email, id]);
        if (result.affectedRows > 0) {
            res.redirect('/faculty/list');
        } else {
            res.status(404).send('Faculty member not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// deleting
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM faculty WHERE faculty_id = ?', [id]);
        if (rows.length > 0) {
            res.render('faculty/delete', { faculty: rows[0] });
        } else {
            res.status(404).send('Faculty member not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM faculty WHERE faculty_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.redirect('/faculty/list');
        } else {
            res.status(404).send('Faculty member not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
