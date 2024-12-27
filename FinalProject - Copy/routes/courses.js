// JavaScript source code
const express = require('express');
const db = require('../db');
const router = express.Router();

// CRUD operations for students

// Create a student
router.get('/add', (req, res) => {
    res.render('courses/add');
});
router.post('/add', async (req, res) => {
    const { course_name, credits } = req.body;
    try {
        const [result] = await db.query('INSERT INTO courses (course_name, credits) VALUES (?, ?)', [course_name, credits]);
        res.status(201).redirect('/courses/list');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// List all courses
router.get('/list', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM courses');
        res.render('courses/list', { courses: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Show the form to edit a course
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM courses WHERE course_id = ?', [id]);
        if (rows.length > 0) {
            res.render('courses/edit', { course: rows[0] });
        } else {
            res.status(404).send('Course not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Handle editing a course
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { course_name, credits } = req.body;
    try {
        const [result] = await db.query('UPDATE courses SET course_name = ?, credits = ? WHERE course_id = ?', [course_name, credits, id]);
        if (result.affectedRows > 0) {
            res.redirect('/courses/list');
        } else {
            res.status(404).send('Course not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Show the confirmation form for deleting a course
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM courses WHERE course_id = ?', [id]);
        if (rows.length > 0) {
            res.render('courses/delete', { course: rows[0] });
        } else {
            res.status(404).send('Course not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Handle deleting a course
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM courses WHERE course_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.redirect('/courses/list');
        } else {
            res.status(404).send('Course not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
