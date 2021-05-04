// import libraries
var db = require("../db");
const evaluationService = require("../services/evaluation");

exports.create = async function(req, res, next) {
  try {
    await evaluationService.create(req.body);

    return res.status(200).send("Evaluation was created succesfully");
  } catch (e) {
    next(e);
  }
}

exports.find = async function(req, res, next) {
  try {
    let evaluations;
    if (req.query) {
      evaluations = await evaluationService.find(req.query);
    } else {
      evaluations = await evaluationService.find({});
    }

    return res.status(200).send(evaluations);
  } catch (e) {
    next(e);
  }
}

exports.findOne = async function(req, res, next) {
  try {
    let params = (req.query) ? req.query : {};
    params.id = req.params.id;
    let evaluation = await evaluationService.findOne(params);

    if (!evaluation) {
      throw {status: 404, message:'Evaluation not found'};
    }

    return res.status(200).send(evaluation);
  } catch (e) {
    next(e);
  }
}

exports.update = async function(req, res, next) {
  try {
    if(Object.keys(req.body).length === 0) {
      throw {status: 422, message:'Request body is empty'};
    }

    await evaluationService.update(req.body, req.params.id);

    return res.status(200).send("Evaluation updated succesfully");
  } catch (e) {
    next(e);
  }
}

exports.delete = async function(req, res, next) {
  try {
    await evaluationService.delete(req.params.id);

    return res.status(200).send("Evaluation deleted succesfully");
  } catch (e) {
    next(e);
  }
}
