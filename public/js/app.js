var app = angular.module('gifter',['ngResource','ngRoute'])
    .config(function ($routeProvider,$locationProvider) { // $locationProvide html5Mode -> true (no #)
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
            .when('/profile',{
                templateUrl : "templates/editProfile.html",
                controller:'editProfileCtrl'
            })
            .when('/add/person',{
                templateUrl : "templates/addPerson.html",
                controller:'addPersonCtrl'
            })
            .when('/people',{
                templateUrl : "templates/people.html",
                controller:'peopleCtrl'
            })
            .when('/person/:id',{
                templateUrl : "templates/editPerson.html",
                controller:'editPersonCtrl'
            })
            .when('/gifts',{
                templateUrl : "templates/gifts.html",
                controller:'giftsCtrl'
            })
            .when('/add/gift',{
                templateUrl : "templates/addGift.html",
                controller:'addGiftCtrl'
            })
            .when('/gift/:id',{
                templateUrl : "templates/editGift.html",
                controller:'editGiftCtrl'
            })
            .otherwise({redirectTo:'/'});
    });