app.factory('authService',function($location,$http,$rootScope){
    var baseUrl = 'http://localhost:8080/api/';
    return {
        logIn: function(user , pass){
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'POST',
                url: baseUrl+'login',
                data:'username='+user+'&password='+pass
            }).success(function(res){
                if(res.success){
                    $rootScope.isLogged = true;
                    sessionStorage.setItem('token',res.token);
                    sessionStorage.setItem('id',res.id);
                    sessionStorage.setItem('username',res.username);
                    $location.path('/home');
                }else{
                    console.log("Not ok");
                }
            });
        },
        registerUser:function(user , pass , email){
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'POST',
                url: baseUrl+'register',
                data:'username='+user+'&password='+pass+ '&email=' +email
            }).success(function(res){
                if(res.success){
                    $location.path('/');
                }else{
                    $('#errorReg').text();
                }
            });
        },
        getCurrUser:function(){
            return sessionStorage.getItem('username');
        },
        checkCurrUser:function(){
            var token = sessionStorage.getItem('token');
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded',token:token},
                method: 'GET',
                url: baseUrl+'me'
            }).success(function(res){
                if(res.success){
                    return true;
                }
            });
            return false;
        }
    }
});
