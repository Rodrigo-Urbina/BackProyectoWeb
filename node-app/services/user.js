// import libraries
const userModel = require("../models/user");

exports.create = async function(data) {
  let {error, results, fields} = await userModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      throw {status: 409, message: 'User already exists'};
    }
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.find = async function(params) {
  let {error, results, fields} = await userModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}

exports.findOne = async function(params) {
  const {error, results, fields} = await userModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  if (results.length == 0) {
    throw {status: 404, message:'User not found'};
  }

  return results[0];
}

exports.update = async function(data, id) {
  let {error, results, fields} = await userModel.update(data, id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.delete = async function(id) {
  let {error, results, fields} = await userModel.delete(id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.teacherDetail = async function(id) {
  let {error, results, fields} = await userModel.teacherDetail(id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  if (results.length == 0) {
    throw {status: 404, message:'Teacher not found'};
  }

  return results[0];
}

exports.findTeachers = async function() {
  let {error, results, fields} = await userModel.findTeachers();

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}
