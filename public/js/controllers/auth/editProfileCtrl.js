app.controller('editProfileCtrl',['$scope','authService','$location',function($scope,authService,$location){

    document.title = 'Edit profile';

    $scope.updateProfile = function(){
        var username =$('#new-username').val(),
            pass =$('#new-password').val(),
            email=$('#new-email').val();
        if(username.length >= 6 && pass.length >= 6 && validateEmail(email)) {
            authService.updateProfile(username, pass, email).then(function (message) {
                $('#errorStat').css('display','none');
                $('#successStat').css('display','block');
                $scope.status = "Error";
                $scope.message = message;
            }, function (message) {
                $('#errorStat').css('display','block');
                $('#successStat').css('display','none');
                $scope.status = "Success";
                $scope.message = message;
            });
        }else{
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.status = "Error";
            $scope.message = "Please , enter valid information about yourself!";
        }
    };

    $scope.updateUsername = function(){
        var user =$('#new-username').val();
        if(user.length >= 6 && user.indexOf(' ') === -1){
            authService.updateUsername(user).then( function (message) {
                $('#errorStat').css('display','block');
                $('#successStat').css('display','none');
                $scope.status = "Error";
                $scope.message = message;
            }, function (message) {
                $('#errorStat').css('display','none');
                $('#successStat').css('display','block');
                $scope.status = "Success";
                $scope.message = message;
            });
        }else{
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.status = "Error";
            $scope.message = "Please , enter valid username!";
        }
    };

    $scope.updatePassword = function(){
        var password =$('#new-password').val();
        if(password.length >= 6 && password.indexOf(' ') === -1){
            authService.updatePassword(password).then(function(message){
                $('#errorStat').css('display','block');
                $('#successStat').css('display','none');
                $scope.status = "Error";
                $scope.message = message;
            }, function (message) {
                $('#errorStat').css('display','none');
                $('#successStat').css('display','block');
                $scope.status = "Success";
                $scope.message = message;
            });
        }else{
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.status = "Error";
            $scope.message = "Please , enter valid password!";
        }
    };

    $scope.updateEmail = function(){
        var email =$('#new-email').val();
        if(validateEmail(email)){
            authService.updateEmail(email).then( function (message) {
                $('#errorStat').css('display','block');
                $('#successStat').css('display','none');
                $scope.status = "Error";
                $scope.message = message;
            }, function (message) {
                $('#errorStat').css('display','none');
                $('#successStat').css('display','block');
                $scope.status = "Success";
                $scope.message = message;
            });
        }else{
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.status = "Error";
            $scope.message = "Please , enter valid e-mail!";
        }
    };

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    $scope.goToPeople = function () {
      $location.path('/people');
    };

}]);