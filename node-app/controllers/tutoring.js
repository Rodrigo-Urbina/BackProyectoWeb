// import libraries
var db = require("../db");
const tutoringService = require("../services/tutoring");
const tutoringCommentService = require("../services/tutoringComment");
const userService = require("../services/user");

exports.create = async function(req, res, next) {
  try {
    await tutoringService.create(req.body);

    return res.status(200).send("Tutoring was created succesfully");
  } catch (e) {
    next(e);
  }
}

exports.find = async function(req, res, next) {
  try {
    let tutorings;
    if (req.query) {
      tutorings = await tutoringService.find(req.query);
    } else {
      tutorings = await tutoringService.find({});
    }
    return res.status(200).send(tutorings);
  } catch (e) {
    next(e);
  }
}

exports.findOne = async function(req, res, next) {
  try {
    let params = (req.query) ? req.query : {};
    params.id = req.params.id;
    let tutoring = await tutoringService.findOne(params);

    if (!tutoring) {
      throw {status: 404, message:'Tutoring not found'};
    }
    return res.status(200).send(tutoring);
  } catch (e) {
    next(e);
  }
}

// ToDo - Change update to a response controller
exports.update = async function(req, res, next) {
  try {
    if(Object.keys(req.body).length === 0) {
      throw {status: 422, message:'Request body is empty'};
    }

    if (req.token.role == 2) {
      let tutoring = await tutoringService.findOne(req.params);
      if (tutoring && (tutoring.teacher != req.token.id)) {
        throw {status: 403, message:'Forbidden'};
      }
    }

    if (req.token.role == 3) {
      let tutoring = await tutoringService.findOne(req.params);
      if (tutoring && (tutoring.student != req.token.id)) {
        throw {status: 403, message:'Forbidden'};
      }
    }

    if (req.body.response_teacher) {
      if (req.token.role == 2) {
        switch (req.body.response_teacher) {
          case 'confirm':
            req.body.status = 'confirmed';
            break;
          case 'reject':
            req.body.status = 'rejected';
            break;
          case 'cancel':
            req.body.status = 'cancelled';
            break;
          default:
            req.body.response_teacher = null;
            req.body.status = 'pending';
        }
      } else {
        throw {status: 403, message:'Forbidden'};
      }
    }

    if (req.body.response_student) {
      if (req.token.role == 3) {
        if (req.body.response_student == 'cancel') {
          req.body.status = 'cancelled';
        }
      } else {
        throw {status: 403, message:'Forbidden'};
      }
    }

    await tutoringService.update(req.body, req.params.id);

    return res.status(200).send("Tutoring updated succesfully");
  } catch (e) {
    next(e);
  }
}

exports.delete = async function(req, res, next) {
  try {
    await tutoringService.delete(req.params.id);

    return res.status(200).send("Tutoring deleted succesfully");
  } catch (e) {
    next(e);
  }
}

exports.detail = async function(req, res, next) {
  try {
    let tutoring = await tutoringService.findOne(req.params);

    let student = await userService.findOne({id: tutoring.student});
    tutoring.student = {
      id: student.id,
      email: student.email,
      name_first: student.name_first,
      name_last: student.name_last
    }
    let teacher = await userService.findOne({id: tutoring.teacher});
    tutoring.teacher = {
      id: teacher.id,
      email: teacher.email,
      name_first: teacher.name_first,
      name_last: teacher.name_last
    }
    tutoring.comments = await tutoringCommentService.find({tutoring: req.params.id});

    return res.status(200).send(tutoring);
  } catch (e) {
    next(e);
  }
}

exports.postComment = async function(req, res, next) {
  try {
    let tutoring = await tutoringService.findOne(req.params);
    if (req.token.id != tutoring.teacher && req.token.id != tutoring.student) {
      throw {status: 403, message:'Forbidden'};
    }

    req.body.tutoring = req.params.id;
    req.body.user = req.token.id;
    req.body.datetime = new Date();
    await tutoringCommentService.create(req.body);

    return res.status(200).send("Tutoring comment was posted succesfully");
  } catch (e) {
    next(e);
  }
}

exports.ofTeacher = async function(req, res, next) {
  try {
    if (Object.keys(req.body).length === 0 || !req.body.from || !req.body.to) {
      throw {status: 422, message:'Request body is missing some parameters (example: {from: date, to: date})'};
    }

    let tutorings;
    tutorings = await tutoringService.ofTeacher({
      teacher: req.params.id,
      from: req.body.from,
      to: req.body.to
    });

    return res.status(200).send(tutorings);
  } catch (e) {
    next(e);
  }
}

exports.myPast = async function(req, res, next) {
  try {

    let params = {
      datetime: new Date()
    };

    if (req.token.role == 2) {
      params.teacher = req.token.id;
    } else {
      params.student = req.token.id;
    }

    let tutorings = [];
    tutorings = await tutoringService.myTutorings(params, 'p'); //past

    return res.status(200).send(tutorings);
  } catch (e) {
    next(e);
  }
}

exports.myUpcoming = async function(req, res, next) {
  try {

    let params = {
      datetime: new Date()
    };

    if (req.token.role == 2) {
      params.teacher = req.token.id;
    } else {
      params.student = req.token.id;
    }

    let tutorings = [];
    tutorings = await tutoringService.myTutorings(params, 'u'); //upcoming

    return res.status(200).send(tutorings);
  } catch (e) {
    next(e);
  }
}
