app.controller('loginCtrl',['$scope','authService',function($scope,authService){

    document.title = 'Login';

    $scope.logIn = function(){
        var user = $('#login-name').val(),
            pass = $('#login-pass').val();
        if(user !== '' && pass !== '' && user.length >= 6 && pass.length >= 6){
            authService.logIn(user,pass,function(message){
                loginErrorHandle(message);
            });
        }else if(user === ''){
            loginErrorHandle("Username empty!");
        }else if(pass === ''){
            loginErrorHandle("Password empty!");
        }else if(user.length < 6 || pass.lenght < 6){
            loginErrorHandle("Username/Password incorrect!");
        }
    };

    function loginErrorHandle(message){
        $scope.message = message;
        $('#errorReg').css('display','block');
    }

}]);