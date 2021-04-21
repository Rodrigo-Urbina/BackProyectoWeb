// import libraries
const userModel = require("../models/user");

exports.create = async function(data, next) {
  let {error, results, fields} = await userModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      next({status: 409, message:'User already exists'});
    }
    next({status: 500, message:'Internal Server Error'});
  }
  return;
}

exports.find = async function(params, next) {
  let {error, results, fields} = await userModel.read(params);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return results;
}

exports.findOne = async function(params, next) {
  const {error, results, fields} = await userModel.read(params);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  if (results.length > 0) {
    return results[0];
  } else {
    next({status: 404, message:'User not found'});
  }
}

exports.update = async function(data, id, next) {
  let {error, results, fields} = await userModel.update(data, id);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}

exports.delete = async function(id, next) {
  let {error, results, fields} = await userModel.delete(id);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}

exports.teacherDetail = async function(id, next) {
  let {error, results, fields} = await userModel.teacherDetail(id);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  if (results.length > 0) {
    return results[0];
  } else {
    next({status: 404, message:'User not found'});
  }
}

exports.findTeachers = async function(next) {
  let {error, results, fields} = await userModel.findTeachers();

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return results;
}
