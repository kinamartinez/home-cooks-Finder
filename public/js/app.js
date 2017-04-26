// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['ui.router', 'addCtrl', 'queryCtrl', 'geolocation', 'gservice']);


// Configures Angular routing -- showing the relevant view and controller when needed.
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider

    // Join Team Control Panel
        .state('/join', {
            url: '/join',
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html',

            // Find Home Cooks Control Panel
        })
        .state('/find', {
            url: '/find',
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html',

            // All else forward to the Join Home Cook Team Control Panel
        })
        .state('login', {
            url: '/login',
            controller: 'addCtrl',
            templateUrl: 'partials/login.html',

            // All else forward to the Join Home Cook Team Control Panel
        });
    $urlRouterProvider.otherwise('/');
}]);