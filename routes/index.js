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
  pool.getConnection(function (err, connection) {
      if(connection) {
          console.log("connection");
      }
      // TODO: debug
      connection.query("SELECT * FROM users", function (err, rows) {
          if(err) console.error("err db: ", err);
          console.log("rows: " + JSON.stringify(rows));
          res.render('index', {title: 'View Table', rows: rows});
          connection.release();
      });
  });
});

router.get("/post", function (req, res, next) {
    var username = req.param("username");
    var password = req.param("password");
    var post = req.param("post")
    pool.getConnection(function (err, connection) {
        connection.query("");
    });
});

module.exports = router;
