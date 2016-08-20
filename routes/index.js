var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  /*pool.getConnection(function (err, connection) {
    if(connection) {
      console.log("connection");
    }

    connection.query("SELECT * FROM users", function (err, rows) {
      if(err) console.error("err db: ", err);
      console.log("rows: " + JSON.stringify(rows));
      res.render('index', {title: 'View Table', rows: rows});
      connection.release();
    });
  });*/
  res.render('index', {title: 'Undercover'});
});

router.post("/login", function (req, res, next) {
  var username = req.param("uname");
  var password = req.param("pass");

});

router.post("/register", function (req, res, next) {
  var username = req.param("uname");
  var password = req.param("pass");

});

router.post("/sendpost", function (req, res, next) {
  var post = req.param("post");
  pool.getConnection(function (err, connection) {
    connection.query("", function (err, rows) {
      connection.release();
    });
  });
});

router.get("/getposts", function (req, res, next) {
  res.send("posts");
  pool.getConnection(function (err, connection) {
    connection.query("SELECT post FROM posts", function (err, rows) {
      if(err) console.error("err db: ", err);
      res.send(rows);
      connection.release();
    });
  });
});

router.get("/getnearbyposts", function (req, res, next) {
  res.send("nearbypost");
  var location = req.param("location");
  pool.getConnection(function (err, connection) {
    connection.query("SELECT post FROM posts where location=" + location, function (error, rows) {
      if(err) console.error("err db: ", err);
      res.send(rows);
      connection.release();
    });
  });
});

module.exports = router;
