app.controller('editPersonCtrl',['$scope','peopleService','$location','$routeParams',function($scope,peopleService,$location,$routeParams){

    var id = $routeParams.id;

    $scope.person = peopleService.getPerson(id).then(function (data) {
        $scope.person = data;
        document.title = $scope.person;
    });

    $scope.editPerson = function () {
        var name = $('#edit-person').val();
        peopleService.updataPerson(id,name).then(function () {
            $location.path('/people');
        }, function (message) {
            console.log(message);
        });

    };

    $scope.cancel = function(){
        $location.path('/people');
    };

}]);