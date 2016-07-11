//require the modules that we need
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var bodyParser = require('body-parser');
var Item = require('./server/itemModel.js');

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
app.use(express.static(__dirname + '/compiled/src'));

mongoose.connect('mongodb://localhost/jennica');

app.all('*', function(req, res, next) { 
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  next(); 
});

app.get('/', function(req, res) {
  res.render('/');
  res.send("Hello");
});

app.post('/api/list', function(req, res){
  //add new items to database
  var name = req.body.name;
  var quantity = req.body.quantity;
  var description = req.body.description;

  //new Item made here
  var item = {
    name: name,
    quantity: quantity,
    description: description
  };
  console.log("Server.js line 51", item);


  Item.findOne({ name: name }, function(err, found){
    if (err){
      console.log("Bummer ", err);
      res.send(404);
    }
    if (!found){
      Item.create(item, function(err, item){
        if (err){
          console.log("Bummer ", err);
        } else {
          console.log("item created ", item);

          res.send(201, item);
        }
      });
    } else {
      console.log("Item already found");
      Item.update({ name: name }, item, function(err, item){
        if (!err){
          console.log("Updated ", item);
          res.send(201, item);
        }
      });
    }
  });
});

app.listen(1337);

console.log("Server is listening on 1337");



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
