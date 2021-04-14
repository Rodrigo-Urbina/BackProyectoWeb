// import libraries
const userModel = require("../models/user");

exports.create = async function(data, next) {
  let {error, results, fields} = await userModel.create(req.body);
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
    return null;
  }
}

exports.update = async function(data, id, next) {
  let {error, results, fields} = userModel.update(data, id);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}

exports.delete = async function(id, next) {
  let {error, results, fields} = userModel.delete(id);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}
