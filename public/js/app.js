var app;
app = angular.module('gifter', ['ngResource', 'ngRoute','ngAnimate', 'ui.bootstrap','ngTouch','ngCookies'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');// $locationProvide html5Mode -> true (no #)
        $routeProvider.when('/', {
            resolve: {
                'check': function ($cookies,$location) {
                    if ($cookies.get('gifter-access-token')) {
                        $location.path('/home');
                    }
                }
            },
            templateUrl: "templates/auth/login.html",
            controller: "loginCtrl"
        })
            .when('/register', {
                resolve: {
                    'check': function ($cookies,$location) {
                        if ($cookies.get('gifter-access-token')) {
                            $location.path('/home');
                        }
                    }
                },
                templateUrl: "templates/auth/register.html",
                controller: 'registerCtrl'
            })
            .when('/home', {
                resolve: {
                    'check': function ($cookies,$location) {
                        if (!$cookies.get('gifter-access-token')) {
                            $location.path('/');
                        }
                    }
                },
                templateUrl: "templates/home.html",
                controller: "homeCtrl"
            })
            .when('/profile', {
                resolve: {
                    'check': function ($cookies,$location) {
                        if (!$cookies.get('gifter-access-token')) {
                            $location.path('/');
                        }
                    }
                },
                templateUrl: "templates/auth/editProfile.html",
                controller: 'editProfileCtrl'
            })
            .when('/add/person', {
                resolve: {
                    'check': function ($cookies,$location) {
                        if (!$cookies.get('gifter-access-token')) {
                            $location.path('/');
                        }
                    }
                },
                templateUrl: "templates/people/addPerson.html",
                controller: 'addPersonCtrl'
            })
            .when('/people', {
                resolve: {
                    'check': function ($cookies,$location) {
                        if (!$cookies.get('gifter-access-token')) {
                            $location.path('/');
                        }
                    }
                },
                templateUrl: "templates/people/people.html",
                controller: 'peopleCtrl'
            })
            .when('/person/:id', {
                resolve: {
                    'check': function ($cookies,$location) {
                        if (!$cookies.get('gifter-access-token')) {
                            $location.path('/');
                        }
                    }
                },
                templateUrl: "templates/people/editPerson.html",
                controller: 'editPersonCtrl'
            })
            .when('/gifts', {
                resolve: {
                    'check': function ($cookies,$location) {
                        if (!$cookies.get('gifter-access-token')) {
                            $location.path('/');
                        }
                    }
                },
                templateUrl: "templates/gifts/gifts.html",
                controller: 'giftsCtrl'
            })
            .when('/add/gift', {
                resolve: {
                    'check': function ($cookies,$location) {
                        if (!$cookies.get('gifter-access-token')) {
                            $location.path('/');
                        }
                    }
                },
                templateUrl: "templates/gifts/addGift.html",
                controller: 'addGiftCtrl'
            })
            .when('/gift/:id', {
                resolve: {
                    'check': function ($cookies,$location) {
                        if (!$cookies.get('gifter-access-token')) {
                            $location.path('/');
                        }
                    }
                },
                templateUrl: "templates/gifts/editGift.html",
                controller: 'editGiftCtrl'
            })
            .otherwise({redirectTo: '/'});
    });