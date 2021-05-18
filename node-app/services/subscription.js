// import libraries
const subscriptionModel = require("../models/subscription");

exports.create = async function(data) {
  let {error, results, fields} = await subscriptionModel.create(data);
  if (error) {
    if (error.errno == 1062) {
      throw {status: 409, message:'Subscription already exists'};
    }
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.find = async function(params) {
  let {error, results, fields} = await subscriptionModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results;
}

exports.findOne = async function(params) {
  const {error, results, fields} = await subscriptionModel.read(params);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  if (results.length == 0) {
    throw {status: 404, message:'Subscription not found'};
  }

  return results[0];
}

exports.update = async function(data, id) {
  let {error, results, fields} = await subscriptionModel.update(data, id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.delete = async function(id) {
  let {error, results, fields} = await subscriptionModel.delete(id);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }
}

exports.hasActiveSubscription = async function(user) {
  let {error, results, fields} = await subscriptionModel.hasActiveSubscription(user);

  if (error) {
    throw {status: 500, message:'Internal Server Error'};
  }

  return results[0].isActive;
}
