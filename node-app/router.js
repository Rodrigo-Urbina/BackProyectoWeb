// import libraries
const express = require("express");
var db = require("./db");
const { authenticateToken } = require("./middleware/authJWT");
const { hashPassword } = require("./middleware/passwordHash");
const userService = require("./controllers/user");

// initialize router
const router = express.Router();

function userBoard(req, res) {
  res.status(200).send("User content for " + req.email);
}

router.get("/", (req, res) => { return res.send("Hello World").status(200);});

// AUTHENTICATION
router.post("/auth/signup", [hashPassword], (req, res) => userService.create(req, res));
router.post("/auth/signin", (req, res) => userService.signin(req, res));

// Testing
router.get("/test/user", [authenticateToken, userBoard]);

module.exports = router;
