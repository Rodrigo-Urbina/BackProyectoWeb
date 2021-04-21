// import libraries
const teacherInfoModel = require("../models/teacherInfo");

exports.create = async function(data, next) {
  let {error, results, fields} = await teacherInfoModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      next({status: 409, message:'User already exists'});
    }
    next({status: 500, message:'Internal Server Error'});
  }
  return;
}

exports.find = async function(params, next) {
  let {error, results, fields} = await teacherInfoModel.read(params);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return results;
}

exports.findOne = async function(params, next) {
  const {error, results, fields} = await teacherInfoModel.read(params);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  if (results.length > 0) {
    return results[0];
  } else {
    next({status: 404, message:'Teacher not found'});
  }
}

exports.update = async function(data, teacherId, next) {
  let {error, results, fields} = await teacherInfoModel.update(data, teacherId);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}

exports.delete = async function(teacherId, next) {
  let {error, results, fields} = await teacherInfoModel.delete(teacherId);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}
