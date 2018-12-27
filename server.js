var express = require('express');
var app =  express();
app.use(express.static('public'));

// var bodyParser = require('body-parser');   //required for POST requests? 
// app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

var favicon = require('serve-favicon');
var path = require('path');
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));

app.use(require('./routes'));

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Server started at port 3000..`);
});




