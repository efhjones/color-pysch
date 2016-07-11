//require the modules that we need
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var bodyParser = require('body-parser');

//initialize the app as an express app
var app = express();

//attaches bodyParser to our app. Parses requests so we don't have to
//.json specifies type of files we want
app.use(bodyParser.json());

//renders homepage
//Plug in folder
//If we are asked for any files, it will look here (express.static)

//app.use adds middleware to the app stack
//handles all requests in order

//express.static handles any wildcard routes
app.use(express.static(__dirname + '/client'));

if (process.env.PORT){
  mongoose.connect('  mongodb://efhjones:'+ process.env.MONGO_PASS + '@ds031328.mlab.com:31328/heroku_0p4lrbhq');
} else {
  mongoose.connect('mongodb://localhost/MVP');
  }


var port = process.env.PORT || 3000;
app.listen(port);


console.log("Server is listening on " + port);


app.get('/', function(req, res) {
  res.send("Hello, world!");
});


//create an Express server to connect
//our front end to the MongoDB database

//to run the server, go to terminal and say mongod

/*

Terminal:
  npm install --save mongoose
  npm install --save nodemon
  npm install --save body-parser

  babel compile : babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch


*/





module.exports = app;
