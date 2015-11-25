/**
 * Created by QuadCore on 11/23/2015.
 */
app.controller('peopleCtrl',['$scope','peopleService','$location',function($scope,peopleService,$location){
    document.title = 'People';

    $scope.people = peopleService.getPeople().then(getData);

    function getData(data){
        $scope.people = data.data.people;
    }

    $scope.deletePerson = function (id,i) {
        peopleService.deletePerson(id);
        del(i);
    };

    var del = function(i){
        document.getElementById('peopleTable').deleteRow(i+1);
        delete $scope.people[i];
    };
}]);