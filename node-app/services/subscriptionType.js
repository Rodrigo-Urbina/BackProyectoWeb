// import libraries
const subscriptionTypeModel = require("../models/subscriptionType");

exports.create = async function(data) {
  let {error, results, fields} = await subscriptionTypeModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      throw {status: 409, message:'Subscription Type already exists'};
    }
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.find = async function(params) {
  let {error, results, fields} = await subscriptionTypeModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}

exports.findOne = async function(params) {
  const {error, results, fields} = await subscriptionTypeModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  if (results.length == 0) {
    throw {status: 404, message:'Subscription Type not found'};
  }

  return results[0];
}

exports.update = async function(data, id) {
  let {error, results, fields} = await subscriptionTypeModel.update(data, id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.delete = async function(id) {
  let {error, results, fields} = await subscriptionTypeModel.delete(id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.isActive = async function(params) {
  let {error, results, fields} = await subscriptionTypeModel.isActive(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results.isActive;
}
