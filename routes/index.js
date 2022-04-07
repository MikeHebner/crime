var express = require('express');
var router = express.Router();
var path = require('path');



const Client = require('pg').Client;

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

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

router.get('/barGraph', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public', 'barGraph.html'));
});



module.exports = router;
