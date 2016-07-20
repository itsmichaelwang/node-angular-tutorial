// js/controllers/main.js

angular.module('todoController', [])

  .controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    Todos.get()
      .success(function(data) {
        $scope.todos = data;
      });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node api
    $scope.createTodo = function() {

      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      // people can't just hold enter to keep adding the same to-do anymore
      if (!$.isEmptyObject($scope.formData)) {

        Todos.create($scope.formData)
          .success(function(data) {
            $scope.formData = {}; // clear the form for reuse
            $scope.todos = data;
          });
      }
    };

    // DELETE ==================================================================
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
      Todos.delete(id)
        .success(function(data) {
          $scope.todos = data;
        });
    };
  });
