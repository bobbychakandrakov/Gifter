app.factory('authService',function($location,$http,$rootScope){

    const authUrl = 'http://localhost:8080/auth/',
          apiUrl = 'http://localhost:8080/api/';
    var userId = "";
    return {
        logIn: function(user , pass){
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
                }else{
                    console.log("Not ok");
                }
            });
        },
        registerUser:function(user , pass , email){
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'POST',
                url: authUrl+'register',
                data:'username='+user+'&password='+pass+ '&email=' +email
            }).success(function(res){
                if(res.success){
                    console.log('Ok');
                    $location.path('/');
                }else{
                    console.log('Error');
                    $('#errorReg').text(res.errCode);
                }
            });
        },
        updateProfile:function(user,pass,email){
            var id = sessionStorage.getItem('id');
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'PUT',
                url: apiUrl+'profile'+"/"+userId,
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
                    console.log('Changed!');
                }else{
                    console.log('Error');
                }
            });
        },
        updatePassword:function(pass){
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
                    console.log('Changed!');
                }else{
                    console.log('Error');
                }
            });
        },
        updateEmail:function(email){
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
                    console.log('Changed!');
                }else{
                    console.log('Error');
                }
            });
        }

    }
});
