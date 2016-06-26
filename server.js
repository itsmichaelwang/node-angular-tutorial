// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');                         // log requests to the console (express4)
var bodyParser = require('body-parser');                // pull information from HTML POST (express4)
var methodOverride = require('method-override');        // simulate DELETE and PUT (express4)

// configuration =================
mongoose.connect('mongodb://itsmichaelwang:tutorial@ds023654.mlab.com:23654/node-angular-tutorial');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model =================
var Todo = mongoose.model('Todo', {
  text : String
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// GET all todos
app.get('/api/todos', function(req, res) {

  // use mongoose to find all todos
  Todo.find(function(err, todos) {

    // if error, send error, otherwise return all todos in JSON format
    if (err) {
      res.send(err);
    } else {
      res.json(todos);
    }

  })
});

// POST todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

  // use mongoose to create a todo
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo) {

    // if err, return that, otherwise get all todos
    if (err) {
      res.send(err);
    } else {

      // if err, return that, otherwise return all todos
      Todo.find(function(err, todos) {
        if (err) {
          res.send(err);
        } else {
          res.json(todos);
        }
      });

    }
  });
});

// DELETE a todo
app.delete('/api/todos', function(req, res) {

  // use mongoose to delete a todo by id
  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todo) {

    // if err, return that, otherwise get all todos
    if (err) {
      res.send(err);
    } else {

      // if err, return that, otherwise return all todos
      Todo.find(function(err, todos) {
        if (err) {
          res.send(err);
        } else {
          res.json(todos);
        }
      });

    }
  });
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
