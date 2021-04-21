// import libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var db = require("../db");
const { generateToken } = require("../services/authJWT");
const evaluationService = require("../services/evaluation");

exports.create = async function(req, res, next) {
  await evaluationService.create(req.body, next);

  return res.status(200).send("Evaluation was created succesfully");
}

exports.find = async function(req, res, next) {
  let evaluations;
  if (req.query) {
    evaluations = await evaluationService.find(req.query, next);
  } else {
    evaluations = await evaluationService.find({}, next);
  }

  //var columns = "id, email, name_first, name_last, confirmed, blocked, role, phone";
  return res.status(200).send(evaluations);
}

exports.findOne = async function(req, res, next) {
  let params = (req.query) ? req.query : {};
  params.id = req.params.id;
  let evaluation = await evaluationService.findOne(params, next);

  //var columns = "id, email, name_first, name_last, confirmed, blocked, role, phone";

  if (evaluation) {
    return res.status(200).send(evaluation);
  } else {
    next({status: 404, message:'Evaluation not found'});
  }
}

exports.update = async function(req, res, next) {
  if(Object.keys(req.body).length === 0) {
    next({status: 422, message:'Request body is empty'});
  }

  await evaluationService.update(req.body, req.params.id, next);

  return res.status(200).send("Evaluation updated succesfully");
}

exports.delete = async function(req, res, next) {
  await evaluationService.delete(req.params.id, next);

  return res.status(200).send("Evaluation deleted succesfully");
}
