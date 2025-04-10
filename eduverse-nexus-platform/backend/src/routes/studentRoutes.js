const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticate } = require('../middleware/auth');

/**
 * @route GET /api/students/profile
 * @desc Get student profile
 * @access Private
 */
router.get('/profile', authenticate, studentController.getStudentProfile);

/**
 * @route PUT /api/students/profile
 * @desc Update student profile
 * @access Private
 */
router.put('/profile', authenticate, studentController.updateStudentProfile);

/**
 * @route POST /api/students/education
 * @desc Add education history
 * @access Private
 */
router.post('/education', authenticate, studentController.addEducationHistory);

/**
 * @route GET /api/students/academic-performance
 * @desc Get academic performance
 * @access Private
 */
router.get('/academic-performance', authenticate, studentController.getAcademicPerformance);

/**
 * @route GET /api/students/courses/:courseId/progress
 * @desc Get course progress
 * @access Private
 */
router.get('/courses/:courseId/progress', authenticate, studentController.getCourseProgress);

/**
 * @route POST /api/students/register
 * @desc Register student
 * @access Public
 */
router.post('/register', studentController.registerStudent);

/**
 * @route POST /api/students/connect-wallet
 * @desc Connect wallet to student account
 * @access Private
 */
router.post('/connect-wallet', authenticate, studentController.connectWallet);

module.exports = router; 