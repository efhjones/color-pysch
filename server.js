//require the modules that we need
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var bodyParser = require('body-parser');
var colors = require('./colors.js');
var Promise = require('bluebird');
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


var traits = new mongoose.Schema({
  trait: String,
  colors: Array
});

var schemes = new mongoose.Schema({
  colors: Array,
  created_at: Date
});


var Trait = mongoose.model('Trait', traits);

var Scheme = mongoose.model('Scheme', schemes);

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
}, function(result){
  console.log("hooray!");
});

//returns a randomIndex for a given array
var randomIndex = function(array){
  return Math.floor(Math.random() * array.length);
}

var returnColors = [];

app.get('/', function(req, res) {
  res.render("./index");
  res.send("Hello, world!");
});

app.post('/', function(req, res){
  var colorArray = req.body;
  res.sendStatus(201);

  console.log("Server says: I heard a post! req.body: ", req.body);

  async.each(colorArray, function(color, hello){
    Trait.findOne({ trait: color}, function(err, found){
      if (err){
        console.log("on color", color);
        console.log("Bummer, error line 91 ", err);
      }
      if (found){
        var index = randomIndex(found.colors);
        returnColors.push(found.colors[index]);
      }
    });
  });

  returnColors = [];

  Scheme.findOne({ colors: returnColors }, function(err, found){
    if (err){
      console.log("Err, line 188" , err);
    }
    if (!found){
      Scheme.create({ colors: returnColors, created_at : new Date() }, function(err, scheme){
        if (!err){
          console.log("Scheme created! ", scheme);
        }
      })
    }
  })
});

app.get('/scheme', function(req, res){
  Scheme.findOne({}).sort('-date').exec(function(err, result){
    res.send(result);
  })
})


module.exports.returnColors = returnColors;

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
