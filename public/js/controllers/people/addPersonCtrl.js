app.controller('addPersonCtrl',['$scope','peopleService','$location',function($scope,peopleService,$location){

    document.title = 'Add person';

    $scope.addPerson = function(){
        var name = $('#create-person').val();
        if(name === "" || !validateUsername(name)){
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.stat = "Error";
            $scope.message = "Please, enter name!";
        }else{
            peopleService.createPerson(name).then(function(){
                $('#successStat').css('display','block');
                $('#errorStat').css('display','none');
                $scope.stat = "Success";
                $scope.message = "Person created";
            },function(message){
                $('#successStat').css('display','none');
                $('#errorStat').css('display','block');
                $scope.stat = "Error";
                $scope.message = message;
            });
            $('#create-person').val('');
        }

    };

    $scope.cancel = function(){
        $location.path('/people');
    };

    function validateUsername(name){
        var re = /[^\W\d_]+$/i;
        return re.test(name);
    }

}]);