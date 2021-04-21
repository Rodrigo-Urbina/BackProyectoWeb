// import libraries
const express = require("express");
var db = require("./db");
const { authenticateToken } = require("./middleware/authJWT");
const { hashPassword } = require("./middleware/passwordHash");
const userController = require("./controllers/user");
const { isAdmin } = require('./middleware/isAdmin');
const { isStudent } = require('./middleware/isStudent');

// initialize router
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Hello World").status(200);
});

// AUTHENTICATION
router.post("/auth/signin", (req, res, next) => userController.signin(req, res, next));
router.post("/auth/signup", [hashPassword], (req, res, next) => userController.create(req, res, next));

// Users CRUD
// Create
router.post("/user", [hashPassword, authenticateToken, isAdmin], (req, res, next) => userController.create(req, res, next));
// Read
router.get("/user", [authenticateToken, isAdmin], (req, res, next) => userController.find(req, res, next));
router.get("/user/:id", [authenticateToken, isAdmin], (req, res, next) => userController.findOne(req, res, next));
// Update
router.put("/user/:id", [authenticateToken, isAdmin], (req, res, next) => userController.update(req, res, next));
// Delete
router.delete("/user/:id", [authenticateToken, isAdmin], (req, res, next) => userController.delete(req, res, next));
// Find Teachers
router.get("/teacher", [authenticateToken, isStudent], (req, res, next) => userController.findTeachers(req, res, next));
// Find One Teacher
// Find Teachers
router.get("/teacher/:id", [authenticateToken, isStudent], (req, res, next) => userController.teacherDetail(req, res, next));

// Testing
router.get("/test/user", [authenticateToken], (req, res, next) => {
  res.status(200).send("User content for " + req.token.email);
});
router.get("/test/admin", [authenticateToken, isAdmin], (req, res, next) => {
  res.status(200).send("User " + req.token.email + " is admin!");
});

module.exports = router;
