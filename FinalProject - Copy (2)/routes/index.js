const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/auth');

// Public routes
router.use('/users', require('./auth'));


// Protected routes
router.use('/users', requireLogin, require('./users'));
router.use('/students', requireLogin, require('./students'));
router.use('/courses', requireLogin, require('./courses'));
router.use('/faculty', requireLogin, require('./faculty'));
router.use('/enrollments', requireLogin, require('./enrollments'));

module.exports = router;


