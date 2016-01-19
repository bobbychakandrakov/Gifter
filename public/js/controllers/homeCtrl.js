app.controller('homeCtrl',['$scope','authService','$rootScope','$location',function($scope,authService,$rootScope,$location){

    document.title = 'Home';

    $scope.goToGifts = function () {
      $location.path('/gifts');
    };
}]);