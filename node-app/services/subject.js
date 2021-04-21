// import libraries
const subjectModel = require("../models/subject");

exports.create = async function(data, next) {
  let {error, results, fields} = await subjectModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      next({status: 409, message:'Subject already exists'});
    }
    next({status: 500, message:'Internal Server Error'});
  }
  return;
}

exports.find = async function(params, next) {
  let {error, results, fields} = await subjectModel.read(params);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return results;
}

exports.findOne = async function(params, next) {
  const {error, results, fields} = await subjectModel.read(params);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  if (results.length > 0) {
    return results[0];
  } else {
    next({status: 404, message:'Subject not found'});
  }
}

exports.update = async function(data, id, next) {
  let {error, results, fields} = await subjectModel.update(data, id);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}

exports.delete = async function(id, next) {
  let {error, results, fields} = await subjectModel.delete(id);

  if (error) {
    next({status: 500, message:'Internal Server Error'});
  }

  return;
}
