var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550jsw.cu9cp39fmb3y.us-east-2.rds.amazonaws.com',
  user     : 'jswangnyc',
  password : '550Pals2018!',
  database : 'yelp550',
  port : 3306
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/knowYourPlace', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'knowYourPlace.html'));
});

router.get('/findYourPlace', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'findYourPlace.html'));
});

router.get('/reference', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

router.get('/insert', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'insert.html'));
});

router.get('/friends', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'friends.html'));
});

router.get('/family', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'family.html'));
});

router.get('/data', function(req, res, next) {
  var query = 'SELECT * from Person;';
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
        res.json(rows);
    }  
    });
});

router.get('/knowYourPlace', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'knowYourPlace.html'));
});

router.get('/findYourPlace/:preferences', function(req, res) {
  console.log("hello?");
  console.log(req.params.preferences);
router.get('/findYourPlace?:data', function(req, res) {
  console.log("router activated");
  console.log(req.params.data);
});

router.get('/data/:email', function(req,res) {
  if (req.params.email != 'undefined') {
    var query = 'SELECT * from Person WHERE login = ' + "'" + req.params.email + "'";
  }
  else {
    console.log(req.params.email);
    var query = 'SELECT * from Person;';
  }
  // note that email parameter in the request can be accessed using "req.params.email"
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
        res.json(rows);
    }  
    });
});

// ----Your implemention of route handler for "Insert a new record" should go here-----
router.get('/insert/:login/:name/:sex/:RelationshipStatus/:Birthyear', function(req,res) {
  var query = "INSERT INTO Person VALUES('" + req.params.login + "', '" + req.params.name + "', '" + req.params.sex + "', '" + req.params.RelationshipStatus + "', " + req.params.Birthyear + ");";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});

router.get('/friends/:login', function(req,res) {
  var query = "SELECT DISTINCT F.friend as friend FROM Friends F WHERE (F.login='" + req.params.login + "' OR F.login IN " +
    "(SELECT Fam.member FROM (SELECT A.member AS member FROM Family A WHERE A.login='" + req.params.login + "') Fam) " +
    "AND F.friend <> '" + req.params.login + "');";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});

router.get('/family/:login', function(req,res) {
  var query = "SELECT * FROM Person P WHERE P.login IN (SELECT DISTINCT member FROM Family WHERE login='" + req.params.login + "');";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows)
        res.json(rows);
    }  
  });
});

router.get('/initfamily/', function(req,res) {
  var query = "SELECT DISTINCT login FROM Family";
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
  });
});

router.get('/goback/', function(req,res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});



module.exports = router;
