//require the modules that we need
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var bodyParser = require('body-parser');
var colors = require('./colors.js');
var async = require('async');

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

var port = process.env.PORT || 3000;

if (process.env.PORT){
  mongoose.connect('mongodb://efhjones:'+ process.env.MONGO_PASS + '@ds031328.mlab.com:31328/heroku_0p4lrbhq');
} else {
  mongoose.connect('mongodb://localhost/MVP');
  }



app.listen(port);
console.log("Server is listening on " + port);


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected!')
});


var colorSchema = new mongoose.Schema({
  trait: String,
  colors: Array
});

var Trait = mongoose.model('Trait', colorSchema);

async.eachOf(colors, function(colorArray, color){

  Trait.findOne({ trait: color}, function(err, found){
    if (err){
      console.log("on color", color);
      console.log("Bummer, error line 66 ", err);
    }
    if (!found){
      console.log("I did not find " + color + " so I'mma create it");
      Trait.create({trait: color, colors: colorArray}, function(err, item){
        if (err){
          console.log("Bummer, error line 71 ", err);
        } else {
          console.log("item created ", item);
        }
      });
    }
  });
});

//returns a randomIndex for a given array
var randomIndex = function(array){
  return Math.floor(Math.random() * array.length);
}

app.get('/', function(req, res) {
  res.render("./index");
  res.send("Hello, world!");
});

app.post('/', function(req, res){
  var colorArray = req.body;
  var returnColors= [];
  console.log("Server says: I heard a post! req.body: ", req.body);
  res.sendStatus(201);

  async.each(colorArray, function(color){
    Trait.findOne({ trait: color}, function(err, found){
      if (err){
        console.log("on color", color);
        console.log("Bummer, error line 91 ", err);
      }
      if (found){
        var index = randomIndex(found.colors);
        res.send(returnColors);
        returnColors = [];
      }
    });
  });

})


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
