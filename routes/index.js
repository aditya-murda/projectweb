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
  res.render('index',{title: "sesuatu"});
});

router.get('/home',function(req,res,next){
    res.render('home',{title: "sample homepage"});
});

router.all("/login", function (req, res, next) {
    var username = req.query["uname"];
    var password = req.query["pass"];
    console.log("username: " + username);
    console.log("password: " + password);
    var query = "SELECT iduser FROM users WHERE username='"
        + username + "' AND password='"
        + password + "';";
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows) {
            console.log(JSON.stringify(rows));
            if(rows.length==1) {
                res.json({status: true});
                req.session.login = true;
                req.session.iduser = rows[0].iduser;
            }
            else {
                res.json({status:false});
            }
        });
        connection.release();
    });
});

router.get("/logout", function (req, res, next) {
    var username = req.param("username");
    var password = req.param("password");
    delete req.session;
});

router.all("/changepass", function (req, res, next) {
    var username = req.param("uname");
    var password = req.param("new_pass");
    var query = "UPDATE user SET password='"
        + password + "' WHERE username='"
        + username + "';";
    pool.getConnection(function (err, connection) {
        connection.query(query, function (error, rows) {
            if(err) {
                console.error("err db: ", err);
                res.json({status:0});
            }
            res.json({status:1});
        });
        connection.release();
    });
});

router.all("/register", function (req, res, next) {
    var username = req.param("uname");
    var password = req.param("pass");
    var query = "INSERT INTO users (username, password) VALUES ('" + username
        + "', '" + password +"');";
    console.log(query);
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows) {
            if(err) {
                res.json({status:false});
                console.error("err db: ", err);
            }
            res.json({status:true});
        });
        query = "SELECT iduser FROM users WHERE username='" +
                username + "'";
        connection.query(query, function (error, rows) {
            if(error) {
                res.json({status:false});
                console.error("err db: ", err);
            }
            req.session.login = true;
            req.session.iduser = rows[0];
        });
        connection.release();
    });
});

router.all("/sendpost", function (req, res, next) {
    var post = req.param("post");
    var iduser = req.param("iduser");
    var location = req.param("location");
    var query = "INSERT INTO posts (iduser, post, location) VALUES ('"
        + iduser + "', '" + post + "', '" + location + "'";
    // TODO: send user post
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows) {
            if(err) {
                console.error("err db: ", err);
                res.json({status:0});
            }
            res.json({status:1})
        });
        connection.release();
    });
});

router.all("/getposts", function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT post FROM posts", function (err, rows) {
            if(err) console.error("err db: ", err);
            res.json(rows);
        });
        connection.release();
    });
});

router.get("/getnearbyposts", function (req, res, next) {
    var location = req.param("location");
    pool.getConnection(function (err, connection) {
        connection.query("SELECT post FROM posts where location='"
                + location + "';" , function (error, rows) {
            if(err) console.error("err db: ", err);
            res.json(rows);
        });
        connection.release();
    });
});

module.exports = router;
