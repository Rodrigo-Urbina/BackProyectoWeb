// import libraries
const tutoringModel = require("../models/tutoring");

exports.create = async function(data) {
  let {error, results, fields} = await tutoringModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      throw {status: 409, message:'Tutoring already exists'};
    }
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.find = async function(params) {
  let {error, results, fields} = await tutoringModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}

exports.findOne = async function(params) {
  const {error, results, fields} = await tutoringModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  if (results.length == 0) {
    throw {status: 404, message:'Tutoring not found'};
  }

  return results[0];
}

exports.update = async function(data, id) {
  let {error, results, fields} = await tutoringModel.update(data, id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.delete = async function(id) {
  let {error, results, fields} = await tutoringModel.delete(id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.ofTeacher = async function(params) {
  let {error, results, fields} = await tutoringModel.ofTeacher(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}

exports.myTutorings = async function(params, type) {
  let {error, results, fields} = await tutoringModel.myTutorings(params, type);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}
