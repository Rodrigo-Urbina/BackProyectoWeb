// import libraries
const express = require('express');
var db = require('./db');
const { authenticateToken } = require('./middleware/authJWT');
const { hashPassword } = require('./middleware/passwordHash');
const userController = require('./controllers/user');
const evaluationController = require('./controllers/evaluation');
const tutoringController = require('./controllers/tutoring');
const { isAdmin, isTeacher, isStudent } = require('./middleware/utility');

// initialize router
const router = express.Router();

router.get('/', (req, res) => {
  return res.send('Hello World').status(200);
});

// AUTHENTICATION
router.post('/auth/signin', (req, res, next) => userController.signin(req, res, next));
router.post('/auth/signup', [hashPassword], (req, res, next) => userController.create(req, res, next));

// User routes
// Create
router.post('/user', [hashPassword, authenticateToken, isAdmin], (req, res, next) => userController.create(req, res, next));
// Read
router.get('/user', [authenticateToken, isAdmin], (req, res, next) => userController.find(req, res, next));
router.get('/user/:id', [authenticateToken, isAdmin], (req, res, next) => userController.findOne(req, res, next));
// Update
router.put('/user/:id', [authenticateToken, isAdmin], (req, res, next) => userController.update(req, res, next));
// Delete
router.delete('/user/:id', [authenticateToken, isAdmin], (req, res, next) => userController.delete(req, res, next));
// Find Teachers
router.get('/teacher', [authenticateToken, isStudent], (req, res, next) => userController.findTeachers(req, res, next));
// Find One Teacher
// Find Teachers
router.get('/teacher/:id', [authenticateToken, isStudent], (req, res, next) => userController.teacherDetail(req, res, next));


// Evaluation routes
// Read
router.get('/evaluation', [authenticateToken], (req, res, next) => evaluationController.find(req, res, next));


// Tutoring routes
// Create
router.post('/tutoring', [authenticateToken, isStudent], (req, res, next) => tutoringController.create(req, res, next));
// Read
router.get('/tutoring', [authenticateToken, isAdmin], (req, res, next) => tutoringController.find(req, res, next));
// Read list of tutorings for a given teacher (to see if when a user can appoint a new tutoring) (to fill the calendar)
router.get('/tutoring/teacher/:id', [authenticateToken, isStudent], (req, res, next) => tutoringController.ofTeacher(req, res, next));
// Read list of a user's past tutorings
router.get('/tutoring/myPast', [authenticateToken], (req, res, next) => tutoringController.myPast(req, res, next));
// Read list of a user's upcoming tutorings
router.get('/tutoring/myUpcoming', [authenticateToken], (req, res, next) => tutoringController.myUpcoming(req, res, next));
// Detail
router.get('/tutoring/detail/:id', [authenticateToken], (req, res, next) => tutoringController.detail(req, res, next));
// Update
router.put('/tutoring/:id', [authenticateToken], (req, res, next) => tutoringController.update(req, res, next));
// Post comment
router.post('/tutoring/:id/comment', [authenticateToken], (req, res, next) => tutoringController.postComment(req, res, next));

// Testing
router.get('/test/user', [authenticateToken], (req, res, next) => {
  res.status(200).send('User content for ' + req.token.email);
});
router.get('/test/admin', [authenticateToken, isAdmin], (req, res, next) => {
  res.status(200).send('User ' + req.token.email + ' is admin!');
});

module.exports = router;
