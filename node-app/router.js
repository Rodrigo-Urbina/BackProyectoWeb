// import libraries
const express = require("express");
var db = require("./db");
const { authenticateToken } = require("./middleware/authJWT");
const { hashPassword } = require("./middleware/passwordHash");
const userService = require("./controllers/user");
const { isAdmin } = require('./middleware/isAdmin');

// initialize router
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Hello World").status(200);
});

// AUTHENTICATION
router.post("/auth/signup", [hashPassword], (req, res) => userService.create(req, res));
router.post("/auth/signin", (req, res) => userService.signin(req, res));

// User CRUD
// Create
router.post("/user", [hashPassword, authenticateToken, isAdmin], (req, res) => userService.create(req, res));
// Read
router.get("/user", [authenticateToken, isAdmin], (req, res) => userService.read(req, res));
// Update
router.put("/user/:id", [authenticateToken, isAdmin], (req, res) => userService.update(req, res));
// Delete
router.delete("/user/:id", [authenticateToken, isAdmin], (req, res) => userService.delete(req, res));

// Testing
router.get("/test/user", [authenticateToken], (req, res) => {
  res.status(200).send("User content for " + req.token.email);
});
router.get("/test/admin", [authenticateToken, isAdmin], (req, res) => {
  res.status(200).send("User " + req.token.email + " is admin!");
});

module.exports = router;
