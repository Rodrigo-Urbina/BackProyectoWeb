// import libraries

exports.upload = async function(req, res, next) {
  try {
    return res.status(200).send(req.newURL);
  } catch (e) {
    next(e);
  }
}
