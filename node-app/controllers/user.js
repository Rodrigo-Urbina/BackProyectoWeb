// import libraries
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var db = require("../db");
const { generateToken } = require("../services/authJWT");
const userService = require("../services/user");

exports.create = async function(req, res, next) {
  await userService.create(req.body, next);
  res.status(200).send("User was created succesfully");
}

exports.find = async function(req, res, next) {
  let users;
  if (req.query) {
    users = await userService.find(req.query, next);
  } else {
    users = await userService.find({}, next);
  }

  //var columns = "id, email, name_first, name_last, confirmed, blocked, role, phone";
  return res.status(200).send(users);
}

exports.findOne = async function(req, res, next) {
  let params = (req.query) ? req.query : {};
  params.id = req.params.id;
  let user = await userService.findOne(params, next);

  //var columns = "id, email, name_first, name_last, confirmed, blocked, role, phone";

  if (user) {
    return res.status(200).send(user);
  } else {
    next({status: 404, message:'User not found'});
  }
}

exports.update = async function(req, res, next) {
  if(Object.keys(req.body).length === 0) {
    next({status: 422, message:'Request body is empty'});
  }

  await userService.update(req.body, req.params.id, next);

  res.status(200).send("User updated succesfully");
}

exports.delete = async function(req, res, next) {

  await userService.delete(req.params.id, next);

  res.status(200).send("User deleted succesfully");
}


exports.signin = async function(req, res, next) {
    req.query = {email: req.body.email};
    let user = await userService.findOne(req.query, next);

    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result && user.confirmed && !user.blocked) {
          return res.status(200).send({
            jwt: generateToken({
              email: user.email,
              name_first: user.name_first,
              name_last: user.name_last,
              role: user.role
            })
          });
        } else {
          next({status: 401, message:'Unauthorized'});
        }
      });
    } else {
      next({status: 401, message:'Unauthorized'});
    }
}
