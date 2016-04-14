(function () {
    var moduleName = "todoControllers";
    var app = angular.module(moduleName, ['ngRoute', 'ngResource', 'todoServices', 'todoRoutes']);
    // Controllers ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // start TodoController
    app.controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
            $scope.editing = [];
            $scope.username = '';
            $scope.userTodos = [];
            $scope.setUserName = function (userName) {
                $scope.username = userName; //get the username
                $scope.todos = Todos.query(function () {
                    $scope.userTodos = []; // reset the userTodos array
                    $scope.todos.forEach(function (todo) {
                        if (todo.username == $scope.username) {
                            $scope.userTodos.push(todo);
                        }
                    });
                    $scope.todos = $scope.userTodos;
                });
            };
            $scope.save = function () {
                if (!$scope.newTodo || $scope.newTodo.length < 1) {
                    return;
                }
                var todo = new Todos({ name: $scope.newTodo, username: $scope.username, completed: false });
                todo.$save(function () {
                    $scope.todos.push(todo);
                    $scope.newTodo = ''; // clear textbox
                });
            };
            $scope.update = function (index) {
                var todo = $scope.todos[index];
                Todos.update({ id: todo._id }, todo);
                $scope.editing[index] = false;
            };
            $scope.edit = function (index) {
                $scope.editing[index] = angular.copy($scope.todos[index]);
            };
            $scope.cancel = function (index) {
                $scope.todos[index] = angular.copy($scope.editing[index]);
                $scope.editing[index] = false;
            };
            $scope.remove = function (index) {
                var todo = $scope.todos[index];
                Todos.remove({ id: todo._id }, function () {
                    $scope.todos.splice(index, 1);
                });
                $scope.editing[index] = false;
            };
            $scope.remainingTodos = function () {
                var count = 0;
                angular.forEach($scope.todos, function (todo) {
                    if ($scope.username == todo.username) {
                        count += todo.completed ? 0 : 1;
                    }
                });
                return count;
            };
            $scope.totalTodos = function () {
                var count = 0;
                angular.forEach($scope.todos, function (todo) {
                    if ($scope.username == todo.username) {
                        count++;
                    }
                });
                return count;
            };
        }]); // end TodoController
    // start TodoDetailController
    app.controller('TodoDetailController', ['$scope', '$routeParams', 'Todos', '$location',
        function ($scope, $routeParams, Todos, $location) {
            $scope.todo = Todos.get({ id: $routeParams.id });
            $scope.update = function () {
                Todos.update({ id: $scope.todo._id }, $scope.todo, function () {
                    $location.url('/');
                });
            };
            $scope.remove = function () {
                Todos.remove({ id: $scope.todo._id }, function () {
                    $location.url('/');
                });
            };
            $scope.cancel = function () {
                $location.url('/');
            };
        }]); // end TodoDetailController
})(); //end of closure
//# sourceMappingURL=todocontrollers.js.map