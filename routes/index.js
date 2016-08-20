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
// var session = require("session");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title: "sesuatu"});
});

router.get('/home',function(req,res,next){
    res.render('home',{title: "sample homepage"});
})

router.all("/login", function (req, res, next) {
    var username = req.param("uname");
    var password = req.param("pass");
    console.log("username: " + username);
    console.log("password: " + password);
    pool.getConnection(function (err, connection) {
        connection.query("SELECT iduser FROM users WHERE username='"
                    + username + "' AND password='"
                    + password + "';", function (err, rows) {
            console.log(JSON.stringify(rows));
            if(rows.length==1) {
                res.json({status: true});
            }
            else {
                res.json({status:false});
            }
        });
    });
});

router.post("/logout", function (req, res, next) {
    var username = req.param("username");
    var password = req.param("password");
    // TODO: session logout
    // session.destroy();
});

router.all("/changepass", function (req, res, next) {
    var username = req.param("uname");
    var password = req.param("new_pass");
    pool.getConnection(function (err, connection) {
        connection.query("UPDATE user SET password='"
                + password + "' WHERE username='"
                + username + "';", function (error, rows) {
            if(err) {
                console.error("err db: ", err);
                res.json({status:0});
            }
            res.json({status:1});
            connection.release();
        });
    });
});

router.all("/register", function (req, res, next) {
    var username = req.param("uname");
    var password = req.param("pass");
    var query = "INSERT INTO users (username, password) VALUES ('" + username
        + "', '" + password +"');";
    console.log(query);
    pool.getConnection(function (err, connection) {
        connection.query(query,
            function (error, rows) {
                if(err) {
                    res.json({status:0});
                    console.error("err db: ", err);
                }
                connection.release();
                res.json({status:1});
            });
    });
});

router.all("/sendpost", function (req, res, next) {
    var post = req.param("post");
    var iduser = req.param("iduser");
    var location = req.param("location");
    // TODO: send user post
    pool.getConnection(function (err, connection) {
        connection.query("INSERT INTO posts ( VALUES ('"
                + iduser + "', '" + post + "');", function (err, rows) {
            if(err) {
                console.error("err db: ", err);
                res.json({status:0});
            }
            connection.release();
            res.json({status:1})
            });
    });
});

router.get("/getposts", function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT post FROM posts", function (err, rows) {
            if(err) console.error("err db: ", err);
            res.json(rows);
            connection.release();
        });
    });
});

router.get("/getnearbyposts", function (req, res, next) {
    var location = req.param("location");
    pool.getConnection(function (err, connection) {
        connection.query("SELECT post FROM posts where location='"
                + location + "';" , function (error, rows) {
            if(err) console.error("err db: ", err);
            res.json(rows);
            connection.release();
        });
    });
});

module.exports = router;
