/*
 * Module dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');  
var cookieParser = require('cookie-parser');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var index = require('./routes/index');


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

// Connection URL. This is where mongodb server is running.
var url = 'mongodb://localhost:27017/xwalker_staging';


app.use(bodyParser());
app.use(cookieParser());
app.use('/', index);
app.use('/Index', index);




mongoose.connect(url, function (err, db) {
	if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
	} 
	else {
    console.log('Connection established to', url);	
	}
});

app.listen(3000)