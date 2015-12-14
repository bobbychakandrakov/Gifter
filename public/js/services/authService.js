app.factory('authService',function($location,$http,$rootScope){

    const authUrl = 'http://localhost:8080/auth/',
          apiUrl = 'http://localhost:8080/api/';
    var userId = "";
    return {
        logIn: function(user , pass,call){
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'POST',
                url: authUrl+'login',
                data:'username='+user+'&password='+pass
            }).success(function(res){
                if(res.success){
                    userId = res.id;
                    console.log(userId);
                    sessionStorage.setItem('gifter-access-token',res.token);
                    sessionStorage.setItem('id',res.id);
                    $location.path('/home');
                }
            }).error(function(res){
                call(res.message);
            });
        },
        registerUser:function(user , pass , email, call){
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'POST',
                url: authUrl+'register',
                data:'username='+user+'&password='+pass+ '&email=' +email
            }).success(function(res){
                $location.path('/');
            }).error(function(res){
                call(res.message);
            });
        },
        updateProfile:function(user,pass,email,error){
            var id = sessionStorage.getItem('id');
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'PUT',
                url: apiUrl+'profile'+"/"+id,
                data:'username='+user+'&password='+pass+ '&email=' +email
            }).success(function(res){
                if(res.success){
                    $location.path('/home');
                }
            }).error(function(res){
                error(res.message);
            });
        },
        updateUsername:function(user,error,success){
            var id = sessionStorage.getItem('id');
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'PUT',
                url: apiUrl+'username'+"/"+id,
                data:'username='+user
            }).success(function(res){
                if(res.success){
                    success("Username changed!");
                }
            }).error(function(res){
                error(res.message);
            });
        },
        updatePassword:function(pass,error,success){
            var id = sessionStorage.getItem('id');
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'PUT',
                url: apiUrl+'password'+"/"+id,
                data:'password='+pass
            }).success(function(res){
                if(res.success){
                    success("Password changed!");
                }
            }).error(function(res){
                error(res.message);
            });
        },
        updateEmail:function(email,error,success){
            var id = sessionStorage.getItem('id');
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'PUT',
                url: apiUrl+'email'+"/"+id,
                data:'email='+email
            }).success(function(res){
                if(res.success){
                    success("Email updated!")
                }
            }).error(function(res){
                error(res.message);
            });
        }

    }
});
