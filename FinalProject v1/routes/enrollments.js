// JavaScript source code
const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/add', (req, res) => {
    res.render('enrollments/add');
});

// Add enrollments
router.post('/add', async (req, res) => {
    const { student_id, faculty_id, course_id } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO enrollments (student_id, faculty_id, course_id) VALUES (?, ?, ?)',
            [student_id, faculty_id, course_id]
        );
        res.status(201).redirect('/enrollments/list');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// List all enrollments
router.get('/list', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT e.enrollment_id, s.first_name AS student_name, f.first_name AS faculty_name, c.course_name 
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            JOIN faculty f ON e.faculty_id = f.faculty_id
            JOIN courses c ON e.course_id = c.course_id
        `);
        res.render('enrollments/list', { enrollments: rows }); // Render the list view
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Edit an enrollment (Get the form)
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM enrollments WHERE enrollment_id = ?', [id]);
        if (rows.length > 0) {
            res.render('enrollments/edit', { enrollment: rows[0] }); // Render edit form with current enrollment data
        } else {
            res.status(404).json({ message: 'Enrollment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an enrollment (Handle form submission)
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { student_id, faculty_id, course_id } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE enrollments SET student_id = ?, faculty_id = ?, course_id = ? WHERE enrollment_id = ?',
            [student_id, faculty_id, course_id, id]
        );
        if (result.affectedRows > 0) {
            res.redirect('/enrollments/list'); // Redirect back to the list of enrollments after updating
        } else {
            res.status(404).json({ message: 'Enrollment not found or no changes made' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an enrollment
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM enrollments WHERE enrollment_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.redirect('/enrollments/list'); // Redirect to the list after deleting
        } else {
            res.status(404).json({ message: 'Enrollment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
