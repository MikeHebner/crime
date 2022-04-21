
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var env = require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

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

client.connect(); //connect to database

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
