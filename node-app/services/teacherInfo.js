// import libraries
const teacherInfoModel = require("../models/teacherInfo");

exports.create = async function(data) {
  let {error, results, fields} = await teacherInfoModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      throw {status: 409, message:'User already exists'};
    }
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.find = async function(params) {
  let {error, results, fields} = await teacherInfoModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}

exports.findOne = async function(params) {
  const {error, results, fields} = await teacherInfoModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  if (results.length == 0) {
    throw {status: 404, message:'Teacher not found'};
  }

  return results[0];
}

exports.update = async function(data, teacherId) {
  let {error, results, fields} = await teacherInfoModel.update(data, teacherId);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.delete = async function(teacherId) {
  let {error, results, fields} = await teacherInfoModel.delete(teacherId);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}
