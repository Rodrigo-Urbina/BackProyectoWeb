// import libraries
const express = require('express');
const { upload } = require('./s3-bucket');
const { authenticateToken } = require('./middleware/authJWT');
const { hashPassword } = require('./middleware/passwordHash');
const userController = require('./controllers/user');
const evaluationController = require('./controllers/evaluation');
const tutoringController = require('./controllers/tutoring');
const uploadController = require('./controllers/uploadFiles');
const subscriptionController = require('./controllers/subscription')
const { isAdmin, isTeacher, isStudent, isMinTeacher, isMinStudent } = require('./middleware/utility');

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
router.get('/teacher', [authenticateToken, isMinStudent], (req, res, next) => userController.findTeachers(req, res, next));
// Find One Teacher
// Find Teachers
router.get('/teacher/:id', [authenticateToken, isMinStudent], (req, res, next) => userController.teacherDetail(req, res, next));


// Evaluation routes
// Read
router.get('/evaluation', [authenticateToken], (req, res, next) => evaluationController.find(req, res, next));


// Tutoring routes
// Create
router.post('/tutoring', [authenticateToken, isMinStudent], (req, res, next) => tutoringController.create(req, res, next));
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


// Subscription routes
// Create
router.post('/subscription', [authenticateToken, isAdmin], (req, res, next) => subscriptionController.create(req, res, next));
// Read
router.get('/subscription', [authenticateToken, isAdmin], (req, res, next) => subscriptionController.find(req, res, next));
router.get('/subscription/:id', [authenticateToken, isAdmin], (req, res, next) => subscriptionController.findOne(req, res, next));
// Update
router.put('/subscription/:id', [authenticateToken, isAdmin], (req, res, next) => subscriptionController.update(req, res, next));
// Delete
router.delete('/subscription/:id', [authenticateToken, isAdmin], (req, res, next) => subscriptionController.delete(req, res, next));
// Apply for subscription
router.post('/subscription-application', [authenticateToken, isStudent], (req, res, next) => subscriptionController.apply(req, res, next));
// Review subscription
router.put('/subscription-review/:id', [authenticateToken, isAdmin], (req, res, next) => subscriptionController.review(req, res, next));

// Upload files
router.post('/upload', [authenticateToken, upload.array('file',1)], (req, res, next) => uploadController.upload(req, res, next));

// Testing
router.get('/test/user', [authenticateToken], (req, res, next) => {
  res.status(200).send('User content for ' + req.token.email);
});
router.get('/test/admin', [authenticateToken, isAdmin], (req, res, next) => {
  res.status(200).send('User ' + req.token.email + ' is admin!');
});

module.exports = router;
