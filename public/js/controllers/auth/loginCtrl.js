app.controller('loginCtrl',['$scope','authService',function($scope,authService){
    document.title = 'Login';
    $scope.logIn = function(){
        var user = $('#login-name').val(),
            pass = $('#login-pass').val();
        if(user !== '' && pass !== ''){
            authService.logIn(user,pass);
        }else {
            console.log('Not ok');
        }
    }
}]);