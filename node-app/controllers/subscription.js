// import libraries
var db = require("../db");
const subscriptionService = require("../services/subscription");

exports.create = async function(req, res, next) {
  try {
    await subscriptionService.create(req.body);

    return res.status(200).send("Subscription was created succesfully");
  } catch (e) {
    next(e);
  }
}

exports.find = async function(req, res, next) {
  try {
    let subscriptions;
    if (req.query) {
      subscriptions = await subscriptionService.find(req.query);
    } else {
      subscriptions = await subscriptionService.find({});
    }

    return res.status(200).send(subscriptions);
  } catch (e) {
    next(e);
  }
}

// subscription controller
exports.findOne = async function(req, res, next) {
  try {
    let params = (req.query) ? req.query : {};
    params.id = req.params.id;
    let subscription = await subscriptionService.findOne(params);

    return res.status(200).send(subscription);
  } catch (e) {
    next(e);
  }
}

exports.update = async function(req, res, next) {
  try {
    if(Object.keys(req.body).length === 0) {
      throw {status: 422, message:'Request body is empty'};
    }

    await subscriptionService.update(req.body, req.params.id);

    return res.status(200).send("Subscription updated succesfully");
  } catch (e) {
    next(e);
  }
}

exports.delete = async function(req, res, next) {
  try {
    await subscriptionService.delete(req.params.id);

    return res.status(200).send("Subscription deleted succesfully");
  } catch (e) {
    next(e);
  }
}

exports.apply = async function(req, res, next) {
  try {
    if(Object.keys(req.body).length === 0) {
      throw {status: 422, message:'Request body is empty'};
    }

    if (await subscriptionService.hasActiveSubscription(req.token.id)) {
      throw {status: 409, message:'User already has an active subscription'};
    }

    data = {
      user: req.token.id,
      type: req.body.type,
      date_request: new Date()
    }

    await subscriptionService.create(data);

    return res.status(200).send("Subscription application was created succesfully");
  } catch (e) {
    next(e);
  }
}

exports.review = async function(req, res, next) {
  try {
    if(Object.keys(req.body).length === 0) {
      throw {status: 422, message:'Request body is empty'};
    }

    const { id } = req.params

    let subscription = await subscriptionService.findOne({ id });

    let data = {
      status: (req.body.status == 'approve') ? 'a' : 'r',
      date_review: new Date()
    }

    await subscriptionService.update(data, id);

    return res.status(200).send("Subscription was reviewed succesfully");
  } catch (e) {
    next(e);
  }
}
