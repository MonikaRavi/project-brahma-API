var express = require('express');
var app =  express();
app.use(express.static('public'));
var RateLimit=require('express-rate-limit');

// var bodyParser = require('body-parser');   //required for POST requests
// app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

//for DOS attack prevention
var limiter=require('./security/dos.js');
app.use(limiter.limiter);

var favicon = require('serve-favicon');
var path = require('path');
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));

//require routes
app.use(require('./routes/routes'));

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Server started at port 3000..`);
});