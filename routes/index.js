var express = require('express');
var router = express.Router();
var path = require('path');



const Client = require('pg').Client;

const client = (() => {
  if (process.env.NODE_ENV !== 'production') {
    return new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: false
    });
  } else {
    return new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  } })();

client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dataView', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public', 'dataView.html'));
});

router.get('/dataViewOut', function(req, res, next) {
  client.query("SELECT district, COUNT(*) as count FROM crime_boston GROUP BY district ORDER BY count DESC;", function(err, result){
    if (err) {next(err);}
    res.json(result.rows);
    console.log(result.rows);
  });
});

router.get('/mapViewOut', function(req, res, next) {
  client.query("SELECT district, COUNT(*) as count FROM crime_boston GROUP BY district ORDER BY district;", function(err, result){
    if (err) {next(err);}
    res.json(result.rows);
    console.log(result.rows);
  });
});

router.get('/barGraph', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public', 'barGraph.html'));
});

router.get('/crimeTypeByDistrictCount', function(req, res, next) {
  client.query("Select count(*) as count, offense_code_group, district FROM crime_boston GROUP BY offense_code_group,district;", function(err, result){
    if (err) {next(err);}
    res.json(result.rows);
    console.log(result.rows);
  });
});



module.exports = router;
