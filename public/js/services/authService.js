app.factory('authService',function($location,$http,$rootScope,$cookies,$q){

    const authUrl = 'http://localhost:8080/auth/',
          apiUrl = 'http://localhost:8080/api/';
    return {
        logIn: function(user , pass){
            var deffered = $q.defer();
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'POST',
                url: authUrl+'login',
                data:'username='+user+'&password='+pass
            }).success(function(res){
                $cookies.put('gifter-access-token',res.token);
                $cookies.put('id',res.id);
                deffered.resolve();
            }).error(function(res){
                deffered.reject(res.message);
            });
            return deffered.promise;
        },
        registerUser:function(user , pass , email){
           var deffered = $q.defer();
            $http({
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                method: 'POST',
                url: authUrl+'register',
                data:'username='+user+'&password='+pass+ '&email=' +email
            }).success(function(res){
                deffered.resolve();
            }).error(function(res){
                deffered.reject(res.message);
            });
            return deffered.promise;
        },
        updateProfile:function(user,pass,email){
            var id = sessionStorage.getItem('id');
            var deffered = $q.defer();
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'PUT',
                url: apiUrl+'profile'+"/"+id,
                data:'username='+user+'&password='+pass+ '&email=' +email
            }).success(function(res){
                deffered.resolve();
            }).error(function(res){
                deffered.reject(res.message);
            });
            return deffered.promise;
        },
        updateUsername:function(user){
            var id = $cookies.get('id');
            var deffered = $q.defer();
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'PUT',
                url: apiUrl+'username'+"/"+id,
                data:'username='+user
            }).success(function(res){
                deffered.resolve();
            }).error(function(res){
                deffered.reject(res.message);
            });
            return deffered.promise;
        },
        updatePassword:function(pass){
            var id = $cookies.get('id');
            var deffered = $q.defer();
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'PUT',
                url: apiUrl+'password'+"/"+id,
                data:'password='+pass
            }).success(function(res){
                deffered.resolve();
            }).error(function(res){
                deffered.reject(res.message);
            });
            return deffered.promise;
        },
        updateEmail:function(email){
            var id = $cookies.get('id');
            var deffered = $q.defer();
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'PUT',
                url: apiUrl+'email'+"/"+id,
                data:'email='+email
            }).success(function(res){
                deffered.resolve();
            }).error(function(res){
                deffered.reject(res.message);
            });
            return deffered.promise;
        }

    }
});
