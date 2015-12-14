app.controller('peopleCtrl',['$scope','peopleService','$location',function($scope,peopleService,$location){

    document.title = 'People';

    var len;

    $scope.people = peopleService.getPeople().then(getData);

    function getData(data){
        $scope.people = data.data.people;
        len = $scope.people.length;
    }

    $scope.showTable = function(){
        return !($scope.people === undefined || $scope.people.length == 0 || len == 0);
    };

    $scope.showMessage = function(){
        return !!($scope.people === undefined || $scope.people.length == 0 || len == 0);
    };


    $scope.deletePerson = function (id) {
        bootbox.confirm("Are you sure you want to delete this person?", function (answer) {
            if(answer === true){
                peopleService.deletePerson(id);
                len--;
                $scope.people = peopleService.getPeople().then(getData);
            }
        });

    };
}]);