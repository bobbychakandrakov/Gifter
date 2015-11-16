app.factory('authService',function($location,$http,$rootScope){
    var baseUrl = 'http://localhost:8080/api/';
    var userId = "";
    return {
        logIn: function(user , pass){
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'POST',
                url: baseUrl+'login',
                data:'username='+user+'&password='+pass
            }).success(function(res){
                if(res.success){
                    userId = res.id;
                    console.log(userId);
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
        updateProfile:function(user,pass,email){
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'PUT',
                url: baseUrl+'profile'+"/"+userId,
                data:'username='+user+'&password='+pass+ '&email=' +email
            }).success(function(res){
                if(res.success){
                    $location.path('/home');
                }else{
                    console.log('Error');
                }
            });
        },
        updateUsername:function(user){
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'PUT',
                url: baseUrl+'username'+"/"+userId,
                data:'username='+user
            }).success(function(res){
                if(res.success){
                    console.log('Changed!');
                }else{
                    console.log('Error');
                }
            });
        },
        updatePassword:function(pass){
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'PUT',
                url: baseUrl+'password'+"/"+userId,
                data:'password='+pass
            }).success(function(res){
                if(res.success){
                    console.log('Changed!');
                }else{
                    console.log('Error');
                }
            });
        },
        updateEmail:function(email){
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'PUT',
                url: baseUrl+'email'+"/"+userId,
                data:'email='+email
            }).success(function(res){
                if(res.success){
                    console.log('Changed!');
                }else{
                    console.log('Error');
                }
            });
        }

    }
});
