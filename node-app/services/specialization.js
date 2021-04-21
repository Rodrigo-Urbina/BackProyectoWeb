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

exports.update = async function(data, teacherID, subjectID, next) {
  let {error, results, fields} = await specializationModel.update(data, teacherID, subjectID);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}

exports.delete = async function(teacherID, subjectID, next) {
  let {error, results, fields} = await specializationModel.delete(teacherID, subjectID);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}

exports.findSubjects = async function(teacherID, next) {
  let {error, results, fields} = await specializationModel.findSubjects(teacherID);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return results;
}
