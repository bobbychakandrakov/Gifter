var app = angular.module('gifter',['ngResource','ngRoute'])
    .config(function ($routeProvider,$locationProvider) { // $locationProvide html5Mode -> true (no #)
        $routeProvider.when('/',{
            resolve:{
                'check': function ($location) {
                    if(sessionStorage.getItem('gifter-access-token')){
                        $location.path('/home');
                    }
                }
            },
            templateUrl : "templates/login.html",
            controller:"loginCtrl"
            })
            .when('/register',{
                resolve:{
                    'check': function ($location) {
                        if(sessionStorage.getItem('gifter-access-token')){
                            $location.path('/home');
                        }
                    }
                },
                templateUrl : "templates/register.html",
                controller:'registerCtrl'
            })
            .when('/home',{
                resolve:{
                    'check': function ($location) {
                        if(!sessionStorage.getItem('gifter-access-token')){
                            $location.path('/');
                        }
                    }
                },
                templateUrl : "templates/home.html",
                controller:"homeCtrl"
            })
            .when('/profile',{
                resolve:{
                    'check': function ($location) {
                        if(!sessionStorage.getItem('gifter-access-token')){
                            $location.path('/');
                        }
                    }
                },
                templateUrl : "templates/editProfile.html",
                controller:'editProfileCtrl'
            })
            .when('/add/person',{
                resolve:{
                    'check': function ($location) {
                        if(!sessionStorage.getItem('gifter-access-token')){
                            $location.path('/');
                        }
                    }
                },
                templateUrl : "templates/addPerson.html",
                controller:'addPersonCtrl'
            })
            .when('/people',{
                resolve:{
                    'check': function ($location) {
                        if(!sessionStorage.getItem('gifter-access-token')){
                            $location.path('/');
                        }
                    }
                },
                templateUrl : "templates/people.html",
                controller:'peopleCtrl'
            })
            .when('/person/:id',{
                resolve:{
                    'check': function ($location) {
                        if(!sessionStorage.getItem('gifter-access-token')){
                            $location.path('/');
                        }
                    }
                },
                templateUrl : "templates/editPerson.html",
                controller:'editPersonCtrl'
            })
            .when('/gifts',{
                resolve:{
                    'check': function ($location) {
                        if(!sessionStorage.getItem('gifter-access-token')){
                            $location.path('/');
                        }
                    }
                },
                templateUrl : "templates/gifts.html",
                controller:'giftsCtrl'
            })
            .when('/add/gift',{
                resolve:{
                    'check': function ($location) {
                        if(!sessionStorage.getItem('gifter-access-token')){
                            $location.path('/');
                        }
                    }
                },
                templateUrl : "templates/addGift.html",
                controller:'addGiftCtrl'
            })
            .when('/gift/:id',{
                resolve:{
                    'check': function ($location) {
                        if(!sessionStorage.getItem('gifter-access-token')){
                            $location.path('/');
                        }
                    }
                },
                templateUrl : "templates/editGift.html",
                controller:'editGiftCtrl'
            })
            .otherwise({redirectTo:'/'});
    });