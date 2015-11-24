app.controller('editGiftCtrl',['$scope','peopleService','$location','giftsService','$routeParams',function($scope,peopleService,$location,giftsService,$routeParams){
    document.title = 'Edit gift';
    $scope.people = peopleService.getPeople().then(getData);
    function getData(data){
        $scope.people = data.data.people;
    }
    var id = $routeParams.id;

    console.log($scope.gift);
}]);