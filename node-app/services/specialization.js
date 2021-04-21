// import libraries
const specializationModel = require("../models/specialization");

exports.create = async function(data, next) {
  let {error, results, fields} = await specializationModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      next({status: 409, message:'User already exists'});
    }
    next({status: 500, message:'Internal Server Error'});
  }
  return;
}

exports.find = async function(params, next) {
  let {error, results, fields} = await specializationModel.read(params);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return results;
}

exports.findOne = async function(params, next) {
  const {error, results, fields} = await specializationModel.read(params);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  if (results.length > 0) {
    return results[0];
  } else {
    next({status: 404, message:'Specialization not found'});
  }
}

exports.update = async function(data, teacher, subject, next) {
  let {error, results, fields} = await specializationModel.update(data, teacher, subject);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}

exports.delete = async function(teacher, subject, next) {
  let {error, results, fields} = await specializationModel.delete(teacher, subject);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}
