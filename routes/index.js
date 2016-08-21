var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'undercover'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Undercover' });
});

router.get('/home', function(req, res, next) {
    if(!req.session.login) {
        console.log("user not log in");
        res.redirect("localhost:3000/");
    }
    res.render('home-all', { title: 'Undercover - Home' });
});

router.get('/nearby', function(req, res, next) {
    if(!req.session.login) {
        console.log("user not log in");
        res.redirect("localhost:3000/");
    }
    res.render('home-nearby', { title: 'Undercover - Home' });
});

router.get('/setting', function(req, res, next) {
    if(!req.session.login) {
        console.log("user not log in");
        res.redirect("localhost:3000/");
    }
    res.render('setting', { title: 'Undercover - Setting' });
});

/* REST API */
router.all("/login", function (req, res, next) {
    var username = req.param("uname");
    var password = req.param("pass");
    var query = "SELECT * FROM user WHERE uname='"
        + username + "' AND pass='"
        + password + "';";
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows) {
            console.log(JSON.stringify(rows));
            if(rows.length == 1) {
                res.json({status: true});
                req.session.login = true;
                req.session.userid = rows[0].id_user;
            } else {
                res.json({status: false});
            }
        });
        connection.release();
    });
});

router.all("/logout", function (req, res, next) {
    req.session.destroy();
});

router.all("/changepass", function (req, res, next) {
    var username = req.param("uname");
    var oldpw = req.param("old_pass");
    var newpw = req.param("new_pass");
    var query = "UPDATE user SET pass='"
        + newpw + "' WHERE uname='"
        + username + "' AND pass='"
        + oldpw + "';";
    pool.getConnection(function (err, connection) {
        connection.query(query, function (error, rows) {
            if (err) {
                console.error("err db: ", err);
                res.json({status: false});
            }
            res.json({status: true});
        });
        connection.release();
    });
});

router.all("/register", function (req, res, next) {
    var username = req.param("uname");
    var password = req.param("pass");
    var query = "INSERT INTO user (uname, pass) VALUES ('" + username
        + "', '" + password +"');";
    console.log(query);
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows) {
            if(err) {
                res.json({status: false});
                console.error("err db: ", err);
            }
            res.json({status: true});
        });
        query = "SELECT * FROM user WHERE uname='" +
            username + "'";
        connection.query(query, function (error, rows) {
            if(error) {
                res.json({status: false});
                console.error("err db: ", err);
            }
        });
        connection.release();
    });
});

router.all("/posting", function (req, res, next) {
    var userid = req.session.userid;
    var post = req.param("isi_post");
    var location = req.param("location");
    var query = "INSERT INTO post (id_user, isi_post, location) VALUES ('"
        userid + "','" + post + "', '" + location + "')";
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows) {
            if(err) {
                console.error("err db: ", err);
                res.json({status: false});
            }
            res.json({status: true})
        });
        connection.release();
    });
});

router.all("/postcomment", function (req, res, next) {
    var userid = req.session.userid;
    var post = req.param("id_post");
    var comment = req.param("isi_comment");
    var query = "INSERT INTO comment (id_post, id_user, isi_comment) VALUES ('"
        + userid + "', '" + post + "', '" + comment + "')";
    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows) {
            if(err) {
                console.error("err db: ", err);
                res.json({status: false});
            }
            res.json({status: true})
        });
        connection.release();
    });
});

router.all("/getall", function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var query = "SELECT id_post, isi_post FROM post;"
        connection.query(query, function (err, rows) {
            if(err) console.error("err db: ", err);
            res.json(rows);
        });
        connection.release();
    });
});

router.get("/getnearby", function (req, res, next) {
    var location = req.param("location");
    pool.getConnection(function (err, connection) {
        var query = "SELECT id_post, isi_post FROM post where location='"
            + location + "';";
        connection.query(query , function (error, rows) {
            if(err) console.error("err db: ", err);
            res.json(rows);
        });
        connection.release();
    });
});

module.exports = router;