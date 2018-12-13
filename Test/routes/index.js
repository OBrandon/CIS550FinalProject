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

/*router.get('/knowYourPlace/:zipcode', function(req, res, next) {
  console.log(req.params.zipcode)
  console.log(req.params)
  var query = 'SELECT * from YelpBusinesses WHERE postal_code = ' + "'" + req.params.zipcode + "'";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
        res.json(rows);
    }  
    });
});*/

router.get('/knowYourPlace/:zipcode', function(req, res, next) {
  console.log(req.params.zipcode)
  console.log(req.params)
  var query = 'SELECT Y.latitude, Y.longitude, Y.name, Y.stars, Y.address, M.RentPrice FROM YelpBusinesses Y JOIN MedianRentPricePerSqFt M ON Y.postal_code = M.RegionName WHERE Y.postal_code = ' + "'" + req.params.zipcode + "'";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }  
    });
});

router.get('/knowYourPlace/:zipcode/:cuisine/:pricerange/:delivery/:bars/:clubs/:casinos/:rentprice/:listprice/:housevalue', function(req, res) {
  console.log("router activated");
  var query = 'SELECT *, AVG(stars) as avg_stars, AVG(review_count) as avg_reviews, AVG(price_range) as avg_price_range FROM YelpBusinesses Y JOIN MedianRentPricePerSqFt M ON Y.postal_code = M.RegionName JOIN MedianListPricePerSqFt ML ON Y.postal_code = ML.RegionName' + 
  ' JOIN MedianValuePerSqFt MV ON Y.postal_code = MV.RegionName WHERE Y.postal_code = ' + "'" + req.params.zipcode + "'";
  var restaurant = false;
  var atLeastOne = true;
  if (req.params.pricerange == 'true') {
    if (atLeastOne) {
      query = query + ' OR price_range = 1' + ' OR price_range = 2' + ' OR price_range = 3' + ' OR price_range = 4';
    } else {
      query = query + ' WHERE price_range = 1';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.delivery == 'true') {
    if (atLeastOne) {
      query = query + ' OR delivery = TRUE';
    } else {
      query = query + ' WHERE delivery = TRUE';
      atLeastOne = true;
    } restaurant = true;   
  }

  /* Nightlife */
  if (req.params.casinos == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Casinos%"';
    } else {
      query = query + ' WHERE categories LIKE "%Casinos%"';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.clubs == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Dance Clubs%"';
    } else {
      query = query + ' WHERE categories LIKE "%Dance Clubs%"';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.bars == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Bars%"';
    } else {
      query = query + ' WHERE categories LIKE "%Bars%"';
      atLeastOne = true;
    } restaurant = true;   
  }

query = query + ' GROUP BY Y.neighborhood ORDER BY count(*)';

  console.log(query);
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


router.get('/findYourPlace/:delivery/:onedollarsign/:twodollarsigns/:threedollarsigns/:fourdollarsigns/:weekends/:vegan/:vegetarian/:bars/:clubs/:casinos/:cafes/:noise/:childcare/:recreation/:low/:mid/:high', function(req, res) {
  console.log("router activated");
  var query = 'SELECT postal_code, count(*) FROM YelpBusinesses';
  var restaurant = false;
  var atLeastOne = false;
  // Restaurants settings
  if (req.params.delivery == 'true') {
    if (atLeastOne) {
      query = query + ' OR delivery = TRUE';
    } else {
      query = query + ' WHERE delivery = TRUE';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.onedollarsign == 'true') {
    if (atLeastOne) {
      query = query + ' OR price_range = 1';
    } else {
      query = query + ' WHERE price_range = 1';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.twodollarsigns == 'true') {
    if (atLeastOne) {
      query = query + ' OR price_range = 2';
    } else {
      query = query + ' WHERE price_range = 2';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.threedollarsigns == 'true') {
    if (atLeastOne) {
      query = query + ' OR price_range = 3';
    } else {
      query = query + ' WHERE price_range = 3';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.fourdollarsigns == 'true') {
    if (atLeastOne) {
      query = query + ' OR price_range = 4';
    } else {
      query = query + ' WHERE price_range = 4';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.weekends == 'true') {
    if (atLeastOne) {
      query = query + ' OR hours_Saturday IS NOT NULL OR hours_Sunday IS NOT NULL';
    } else {
      query = query + ' WHERE hours_Saturday IS NOT NULL OR hours_Sunday IS NOT NULL';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.vegan == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Vegan%"';
    } else {
      query = query + ' WHERE categories LIKE "%Vegan%"';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.vegetarian == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Vegetarian%"';
    } else {
      query = query + ' WHERE categories LIKE "%Vegetarian%"';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (restaurant) {
    query = query + ' AND categories LIKE "%Restaurants%"';
  }

  /* Coffees and Tees */
  if (req.params.cafes == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Coffee & Tea%"';
    } else {
      query = query + ' WHERE categories LIKE "%Coffee & Tea%"';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.noise == 'true') {
    if (atLeastOne) {
      query = query + ' OR noise_level = "quiet"';
    } else {
      query = query + ' WHERE noise_level = "quiet"';
      atLeastOne = true;
    } restaurant = true;   
  }

  /* Nightlife */
  if (req.params.casinos == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Casinos%"';
    } else {
      query = query + ' WHERE categories LIKE "%Casinos%"';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.clubs == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Dance Clubs%"';
    } else {
      query = query + ' WHERE categories LIKE "%Dance Clubs%"';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.bars == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Bars%"';
    } else {
      query = query + ' WHERE categories LIKE "%Bars%"';
      atLeastOne = true;
    } restaurant = true;   
  }

  /* Family */
  if (req.params.childcare == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Child Care & Day Care%"';
    } else {
      query = query + ' WHERE categories LIKE "%Child Care & Day Care%"';
      atLeastOne = true;
    } restaurant = true;   
  }
  if (req.params.recreation == 'true') {
    if (atLeastOne) {
      query = query + ' OR categories LIKE "%Recreation%"';
    } else {
      query = query + ' WHERE categories LIKE "%Recreation%"';
      atLeastOne = true;
    } restaurant = true;   
  }

  query = query + ' GROUP BY postal_code ORDER BY count(*) DESC LIMIT 1';
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }  
  });  
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