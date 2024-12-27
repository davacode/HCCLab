const express = require('express');
const db = require('../db');
const router = express.Router();

// Create a student
router.get('/add', (req, res) => {
    res.render('students/add'); 
});
router.post('/add', async (req, res) => {
    const { first_name, last_name, email } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO students (first_name, last_name, email) VALUES (?, ?, ?)',
            [first_name, last_name, email]
        );
        res.status(201).redirect('/students/list');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for displaying the list of students
router.get('/list', async (req, res) => {
    try {
        const [students] = await db.query('SELECT * FROM students');
        res.render('students/list', { students });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a student
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [student] = await db.query('SELECT * FROM students WHERE student_id = ?', [id]);
        if (student.length > 0) {
            res.render('students/delete', { student: student[0] });
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM students WHERE student_id = ?', [id]);
        if (rows.length > 0) {
            res.render('students/edit', { student: rows[0] }); 
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE students SET first_name = ?, last_name = ?, email = ? WHERE student_id = ?',
            [first_name, last_name, email, id]
        );
        if (result.affectedRows > 0) {
            res.redirect('/students/list')
        } else {
            res.status(404).send('Update failed');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a student
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM students WHERE student_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.redirect('/students/list');
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
