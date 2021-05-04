// import libraries
const specializationModel = require("../models/specialization");

exports.create = async function(data) {
  let {error, results, fields} = await specializationModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      throw {status: 409, message:'User already exists'};
    }
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.find = async function(params) {
  let {error, results, fields} = await specializationModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}

exports.findOne = async function(params) {
  const {error, results, fields} = await specializationModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  if (results.length == 0) {
    throw {status: 404, message:'Specialization not found'};
  }

  return results[0];
}

exports.update = async function(data, teacherID, subjectID) {
  let {error, results, fields} = await specializationModel.update(data, teacherID, subjectID);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.delete = async function(teacherID, subjectID) {
  let {error, results, fields} = await specializationModel.delete(teacherID, subjectID);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.findSubjects = async function(teacherID) {
  let {error, results, fields} = await specializationModel.findSubjects(teacherID);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}
