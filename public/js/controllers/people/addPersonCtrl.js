app.controller('addPersonCtrl',['$scope','peopleService','$location',function($scope,peopleService,$location){

    document.title = 'Add person';

    $scope.addPerson = function(){
        var name = $('#create-person').val();
        peopleService.createPerson(name,function(stat,message){
            $scope.status = stat;
            $scope.message = message;
        });
        $('#errorStat').css('display','block');
        $('#create-person').val('');
    };

    $scope.cancel = function(){
        $location.path('/people');
    };

}]);