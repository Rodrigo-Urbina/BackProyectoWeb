// import libraries
const mysql = require("mysql");
var db = require("../db");

exports.create = async function(data) {
  return new Promise(result => {
    db.query(
      "INSERT INTO subscription SET ?",
      data,
      function (error, results, fields) {
        result({error, results, fields});
      });
  });
}

exports.read = async function(params) {
  var sql = "SELECT * FROM subscription";

  if (Object.keys(params).length != 0) { // if query is not empty
    sql += " WHERE ?"; // add where clause for query
  }

  return new Promise(result => {
      db.query(
      sql,
      params, // if query is empty it won't even be used because of missing WHERE clause
      function (error, results, fields) {
        result({error, results, fields});
      });
  });
}

exports.update = async function(data, id) {
  return new Promise(result => {
    db.query(
      "UPDATE subscription SET ? WHERE id = ?",
      [data, id],
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}

exports.delete = async function(id) {
  return new Promise(result => {
    db.query(
      "DELETE FROM subscription WHERE id = ?",
      id,
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}

exports.hasActiveSubscription = async function(userID) {
  let query = `SELECT SUM(NOW() between date_review and date_add(date_review, INTERVAL duration DAY)) as isActive
               FROM subscription
               JOIN subscriptionType
               ON subscription.type = subscriptionType.id
               WHERE user = ?`;
  return new Promise(result => {
    db.query(
      query,
      userID,
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}

exports.myCurrentSubscription = async function(userID) {
  let query = `SELECT s.id, s.user, s.type, s.date_request, s.date_review, s.status, st.name, st.description, st.duration, st.price
               FROM subscription as s
               JOIN subscriptionType as st
               ON s.type = st.id
               WHERE s.user = ? AND s.status = 'a' AND NOW() >= s.date_review AND NOW() <= date_add(s.date_review, INTERVAL st.duration DAY)
               ORDER BY s.date_review DESC;`;
  return new Promise(result => {
    db.query(
      query,
      userID,
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}
