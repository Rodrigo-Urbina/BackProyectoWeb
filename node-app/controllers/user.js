// import libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var db = require("../db");
const { generateToken } = require("../services/authJwt");
const userService = require("../services/user");
const evaluationService = require("../services/evaluation");
const subjectService = require("../services/subject");
const specializationService = require("../services/specialization");

exports.create = async function(req, res, next) {
  try {
    await userService.create(req.body);

    return res.status(200).send("User was created succesfully");
  } catch (e) {
    next(e);
  }
}

exports.find = async function(req, res, next) {
  try {
    let users;
    if (req.query) {
      users = await userService.find(req.query);
    } else {
      users = await userService.find({});
    }

    //var columns = "id, email, name_first, name_last, confirmed, blocked, role, phone";
    return res.status(200).send(users);
  } catch (e) {
    next(e);
  }
}

exports.findOne = async function(req, res, next) {
  try {
    let params = (req.query) ? req.query : {};
    params.id = req.params.id;
    let user = await userService.findOne(params);

    if (!user) {
      throw {status: 404, message:'User not found'};
    }

    return res.status(200).send(user);
  } catch (e) {
    next(e);
  }
}

exports.update = async function(req, res, next) {
  try {
    if(Object.keys(req.body).length === 0) {
      throw {status: 422, message:'Request body is empty'};
    }

    await userService.update(req.body, req.params.id);

    return res.status(200).send("User updated succesfully");
  } catch (e) {
    next(e);
  }
}

exports.delete = async function(req, res, next) {
  try {
    await userService.delete(req.params.id);

    return res.status(200).send("User deleted succesfully");
  } catch (e) {
    next(e);
  }
}


exports.signin = async function(req, res, next) {
  console.log("HERE");
  let user = await userService.findOne({email: req.body.email});

  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result && user.confirmed && !user.blocked) {
        return res.status(200).send({
          jwt: generateToken({
            id: user.id,
            email: user.email,
            name_first: user.name_first,
            name_last: user.name_last,
            role: user.role
          })
        });
      } else {
        throw {status: 401, message:'Unauthorized'};
      }
    });
  } else {
    throw {status: 401, message:'Unauthorized'};
  }
}

exports.findTeachers = async function(req, res, next) {
  try {
    //req.query.role = 'teacher';
    let teachers = await userService.findTeachers();

    return res.status(200).send(teachers);
  } catch (e) {
    next(e);
  }
}

exports.teacherDetail = async function(req, res, next) {
  try {
    let teacher = await userService.teacherDetail(req.params.id);
    let evaluations = await evaluationService.find({teacher: req.params.id});
    let subjects = await specializationService.findSubjects(req.params.id);

    teacher.evaluations = await Promise.all(evaluations.map(async function (evaluation) {
      return {
        id: evaluation.id,
        subject: (await subjectService.findOne({id: evaluation.subject})).name,
        score: evaluation.score,
        comments: evaluation.comments,
        datetime: evaluation.datetime
      };
    }));

    teacher.subjects = subjects.map(function (subject) {
      return subject.name;
    });

    return res.status(200).send(teacher);
  } catch (e) {
    next(e);
  }
}
