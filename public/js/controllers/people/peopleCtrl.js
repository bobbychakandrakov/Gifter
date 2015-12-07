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

    setInterval(function () {
        $('.delete').click(function(e){
            $(this).closest('tr').remove();
        });
    },1000);

    $scope.deletePerson = function (id) {
        peopleService.deletePerson(id);
        len--;
    };

}]);