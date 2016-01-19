app.controller('registerCtrl',['$scope','authService','$location',function($scope,authService,$location){

    document.title = 'Register';

    $scope.haveNavbar = false;

    var userBool=false,
        passBool=false,
        confirmPassBool=false,
        emailBool=false;

    $scope.registerUser = function(){
        var user = $('#register-name').val(),
            pass = $('#register-pass').val(),
            confirmPass = $('#register-confirm-pass').val(),
            email = $('#register-email').val();
        if(userBool && passBool && confirmPass&& emailBool){
            authService.registerUser(user,pass,email).then(function () {
                $location.path('/');
            },function(message){
                errorHandler(message);
            });
        }else if(!userBool){
            errorHandler("Please, enter a valid username!");
        }else if(!passBool){
            errorHandler("Please, enter a valid password!");
        }else if(!confirmPassBool){
            errorHandler("Please, make sure your passwords match!");
        }else if(!emailBool){
            errorHandler("Please, enter a valid e-mail!");
        }
        //pass === confirmPass && pass.length >= 6 && user !== '' && user.indexOf(' ') === -1 && user.length >= 6
    };

    $scope.userNameChange = function () {
        var user = $('#register-name').val();
        if(user.length >= 6 && user.indexOf(' ') === -1){
            $("#userField").attr('class','login-field-icon fui-check');
            userBool =true;
        }else{
            $("#userField").attr('class','login-field-icon fui-cross');
            userBool=false;
        }
    };

    $scope.passwordChange= function(){
        pass = $('#register-pass').val();
        if(pass.length >= 6 && pass.indexOf(' ') === -1){
            $("#passField").attr('class','login-field-icon fui-check');
            passBool=true;
        }else{
            $("#passField").attr('class','login-field-icon fui-cross');
            passBool=false;
        }
    };

    $scope.passwordConfirmChange= function(){
        passConfirm = $('#register-confirm-pass').val();
        if(passConfirm.length >= 6 && passConfirm.indexOf(' ') === -1 && passConfirm === $('#register-pass').val()){
            $("#passConfirmField").attr('class','login-field-icon fui-check');
            confirmPassBool=true;
        }else{
            $("#passConfirmField").attr('class','login-field-icon fui-cross');
            confirmPassBool=false;
        }
    };

    $scope.emailChange= function(){
        mail = $('#register-email').val();
        if(mail.length >= 6 && mail.indexOf(' ') === -1 && validateEmail(mail)){
            $("#emailField").attr('class','login-field-icon fui-check');
            emailBool=true;
        }else{
            $("#emailField").attr('class','login-field-icon fui-cross');
            emailBool=false;
        }
    };

    $scope.isRegisterActive = function(){
        return false;
    };

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function errorHandler(message){
        $('#errorReg').css('display','block');
        $scope.message = message;
    }

    $scope.goToLogin = function () {
        $location.path('/');
    };

}]);