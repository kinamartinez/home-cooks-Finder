app.factory('authfactory', function($http) {
  var auth = {};

  auth.currentUser = {};

  auth.register = function(user) {
    return $http.post('/register', user)
      .then(function(response) {
        auth.currentUser.username = angular.copy(response.data.username)
      });;
  };

  auth.login = function(user) {
    return $http.post('/login', user)
      .then(function(response) {
        auth.currentUser.username = angular.copy(response.data)
      });
  };

  auth.getCurrentUser = function() {
    return $http.get('/currentUser')
      .then(function(response) {
        auth.currentUser.username = angular.copy(response.data)
      });
  }

  auth.logout = function(user) {
    return $http.get('/logout')
      .then(function(response) {
        auth.currentUser.username = null;
      });
  };

  return auth;
});