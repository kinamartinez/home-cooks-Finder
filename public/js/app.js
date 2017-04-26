// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['ui.router', 'addCtrl', 'queryCtrl', 'geolocation', 'gservice']);


// Configures Angular routing -- showing the relevant view and controller when needed.
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider

    // Join Team Control Panel
        .state('register', {
            url: '/register',
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html'
        })
        .state('find', {
            url: '/find',
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html'
        })
        .state('login', {
            url: '/login',
            controller: 'addCtrl',
            templateUrl: 'partials/login.html'
        })
        .state('map', {
          url: '/map',
          templateUrl: '/partials/searchmap.html',
          controller: 'addCtrl'
        })
        .state('comment', {
          url: '/post/:id',
          templateUrl: '/templates/comments.html',
          controller: 'addCtrl'
        })
        .state('cookprofile', {
          url: '/cookProfile',
          templateUrl: '/partials/cookprofile.html',
          controller: 'addCtrl'
        })
        .state('userprofile', {
          url: '/userProfile',
          templateUrl: '/partials/userprofile.html',
          controller: 'addCtrl'
        })
        .state('list', {
          url: '/list',
          templateUrl: '/partials/list.html',
          controller: 'addCtrl'
        })
        .state('order', {
          url: '/order',
          templateUrl: '/partials/order.html',
          controller: 'addCtrl'
        })
    $urlRouterProvider.otherwise('/');
}]);