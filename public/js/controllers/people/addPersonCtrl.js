app.controller('addPersonCtrl',['$scope','peopleService','$location',function($scope,peopleService,$location){
    document.title = 'Add person';
    $scope.addPerson = function(){
        var name = $('#create-person').val();
        peopleService.createPerson(name,function(stat,message){
            if(message === 'Error'){
                $('#errorStat').removeAttr('class');
                $('#errorStat').addClass('alert alert-danger');
            }else{
                $('#errorStat').removeAttr('class');
                $('#errorStat').addClass('alert alert-success');
            }
            $scope.status = stat;
            $scope.message = message;
        });
        $('#errorStat').css('display','block');
    };

    $scope.cancel = function(){
        $location.path('/people');
    };

    $scope.closeAlert = function(){
        $('#errorStat').css('display','none');
    };
}]);