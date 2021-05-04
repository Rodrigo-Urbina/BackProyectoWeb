// import libraries
const tutoringCommentModel = require("../models/tutoringComment");

exports.create = async function(data) {
  let {error, results, fields} = await tutoringCommentModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      throw {status: 409, message:'Tutoring comment already exists'};
    }
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.find = async function(params) {
  let {error, results, fields} = await tutoringCommentModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}

exports.findOne = async function(params) {
  const {error, results, fields} = await tutoringCommentModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  if (results.length == 0) {
    throw {status: 404, message:'Tutoring comment not found'};
  }

  return results[0];
}

exports.update = async function(data, id) {
  let {error, results, fields} = await tutoringCommentModel.update(data, id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.delete = async function(id) {
  let {error, results, fields} = await tutoringCommentModel.delete(id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}
