const express = require('express');
const router = express.Router();

const usersRoutes = require('./users');
const studentsRoutes = require('./students');
const coursesRoutes = require('./courses');
const facultyRoutes = require('./faculty');
const enrollmentsRoutes = require('./enrollments');

router.use('/users', require('./users'));
router.use('/students', require('./students'));
router.use('/courses', require('./courses'));
router.use('/faculty', require('./faculty'));
router.use('/enrollments', require('./enrollments'));

module.exports = router;
