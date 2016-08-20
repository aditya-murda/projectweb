var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'minkkang',
    database: 'test',
    password: '161718'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Undercover' });
});

module.exports = router;
