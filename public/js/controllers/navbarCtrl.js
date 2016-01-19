app.controller('navbarCtrl',['$scope','authService','$cookies','$location',function($scope,authService,$cookies,$location){

    $scope.showNavbar = function () {
        return !($location.path() === '/' || $location.path() === '/register');
    };

    $scope.logOut = function () {
        $cookies.remove('gifter-access-token');
    };

}]);