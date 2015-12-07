app.controller('addPersonCtrl',['$scope','peopleService','$location',function($scope,peopleService,$location){

    document.title = 'Add person';

    $scope.addPerson = function(){
        var name = $('#create-person').val();
        if(name === ""){
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.stat = "Error";
            $scope.message = "Please, enter name!";
        }else{
            peopleService.createPerson(name);
            $('#successStat').css('display','block');
            $('#errorStat').css('display','none');
            $scope.stat = "Success";
            $scope.message = "Person created!";
            $('#create-person').val('');
        }

    };

    $scope.cancel = function(){
        $location.path('/people');
    };

}]);