app.controller('editPersonCtrl',['$scope','peopleService','$location','$routeParams',function($scope,peopleService,$location,$routeParams){

    document.title = 'Edit person';

    var id = $routeParams.id;

    $scope.person = peopleService.getPerson(id).then(getData);

    function getData(data){
        $scope.person = data.data.name;
    }

    $scope.editPerson = function () {
        peopleService.updataPerson(id,$('#edit-person').val());
        $location.path('/people');
    };

    $scope.cancel = function(){
        $location.path('/people');
    };

}]);