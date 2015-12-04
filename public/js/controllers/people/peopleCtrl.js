app.controller('peopleCtrl',['$scope','peopleService','$location','$timeout',function($scope,peopleService,$location,$timeout){

    document.title = 'People';

    $scope.people = peopleService.getPeople().then(getData);

    function getData(data){
        $scope.people = data.data.people;
    }

    $scope.showTable = function(){
        return !($scope.people === undefined || $scope.people.length == 0);
    };

    $scope.showMessage = function(){
        return !!($scope.people === undefined || $scope.people.length == 0);
    };

    $timeout(function () {
        $('.delete').click(function(e){
            $(this).closest('tr').remove();
        });
    },1000);

    $scope.deletePerson = function (id) {
        peopleService.deletePerson(id);
    };

}]);