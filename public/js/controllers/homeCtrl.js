app.controller('homeCtrl',['$scope','authService','$rootScope','$location',function($scope,authService,$rootScope,$location){
    document.title = 'Home';
    $scope.username = authService.getCurrUser();
    $scope.logOut = function(){
        sessionStorage.clear();
        $rootScope.isLogged = false;
        $location.path('/');
    };
}]);