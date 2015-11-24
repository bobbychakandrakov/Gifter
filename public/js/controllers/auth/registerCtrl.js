app.controller('registerCtrl',['$scope','authService',function($scope,authService,$location){
    document.title = 'Register';
    $scope.registerUser = function(){
        var user = $('#register-name').val(),
            pass = $('#register-pass').val(),
            confirmPass = $('#register-confirm-pass').val(),
            email = $('#register-email').val();
        if(pass === confirmPass && pass.length >= 6 && user !== '' && user.indexOf(' ') === -1){
            authService.registerUser(user,pass,email);
        }else {
            $('#errorReg').text("Please, insert username, password and e-mail correctly!");
        }
    };
    $scope.userNameChange = function () {
        var user = $('#register-name').val();
        if(user.length >= 6 && user.indexOf(' ') === -1){
            $("#userField").attr('class','login-field-icon fui-check');
        }else{
            $("#userField").attr('class','login-field-icon fui-cross');
        }
    };

    $scope.passwordChange= function(){
        pass = $('#register-pass').val();
        if(pass.length >= 6 && pass.indexOf(' ') === -1){
            $("#passField").attr('class','login-field-icon fui-check');
        }else{
            $("#passField").attr('class','login-field-icon fui-cross');
        }
    };

    $scope.passwordConfirmChange= function(){
        passConfirm = $('#register-confirm-pass').val();
        if(passConfirm.length >= 6 && passConfirm.indexOf(' ') === -1 && passConfirm === $('#register-pass').val()){
            $("#passConfirmField").attr('class','login-field-icon fui-check');
        }else{
            $("#passConfirmField").attr('class','login-field-icon fui-cross');
        }
    };

    $scope.emailChange= function(){
        mail = $('#register-email').val();
        if(mail.length >= 6 && mail.indexOf(' ') === -1 && validateEmail(mail)){
            $("#emailField").attr('class','login-field-icon fui-check');
        }else{
            $("#emailField").attr('class','login-field-icon fui-cross');
        }
    };

    $scope.isRegisterActive = function(){
        return false;
    };

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
}]);