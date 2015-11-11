var app = angular.module('gifter',['ngResource','ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/',{
            templateUrl : "templates/login.html",
            controller:"loginCtrl"
            })
            .when('/register',{
                templateUrl : "templates/register.html",
                controller:'registerCtrl'
            })
            .when('/home',{
                templateUrl : "templates/home.html",
                controller:"homeCtrl"
            })
            .otherwise({redirectTo:'/'});
    });