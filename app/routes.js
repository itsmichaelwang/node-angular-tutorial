// app/routes.js

// load the todo model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {
  // routes ======================================================================

  // api -------------------------------------------------------------------------
  // GET all todos
  app.get('/api/todos', function(req, res) {
    // use mongoose to find all todos
    Todo.find(function(err, todos) {
      // if error, send error, otherwise return all todos in JSON format
      if (err)
        res.send(err);
      res.json(todos);
    });
  });

  // POST todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {
    // use mongoose to create a todo
    Todo.create({
      text: req.body.text,
      done: false
    }, function(err, todo) {
      if (err)
        res.send(err);

      // get and return all todos after you create another
      Todo.find(function(err, todos) {
        if (err)
          res.send(err);
        res.json(todos);
      });
    });
  });

  // DELETE a todo and send back all todos after deletion
  app.delete('/api/todos/:todo_id', function(req, res) {
    // use mongoose to delete a todo by id
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);

        // get and return all todos after you create another
        Todo.find(function(err, todos) {
          if (err)
            res.send(err);
          res.json(todos);
        });
    });
  });

  // application -----------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
}
