/**
 * Created by QuadCore on 11/18/2015.
 */
app.factory('peopleService', function($location,$http,$cookies,$q){
    const personUrl = 'http://localhost:8080/api/person';
    return {
        createPerson: function(personName){
            var deffered = $q.defer();
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'POST',
                url: personUrl,
                data:'name='+personName
            }).success(function(res){
                deffered.resolve();
            }).error(function(res){
                deffered.reject(res.message);
            });
            return deffered.promise;
        },
        getPeople:function(){
            var deffered = $q.defer();
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'GET',
                url: personUrl
            }).success(function(res){
                deffered.resolve(res.people);
            }).error(function(res){
                deffered.reject(res.message);
            });
            return deffered.promise;
        },
        deletePerson:function(id){
            var deffered = $q.defer();
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'DELETE',
                url: personUrl + '/' + id
            }).success(function(res){
                deffered.resolve();
            }).error(function (res) {
                deffered.reject(res.message);
            });
            return deffered.promise;
        },
        getPerson: function (id) {
            var deffered = $q.defer();
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'GET',
                url: personUrl+'/'+id
            }).success(function(res){
                deffered.resolve(res.name);
            }).error(function (res) {
                deffered.reject(res.message);
            });
            return deffered.promise;
        },
        updataPerson: function (id,name) {
            var deffered = $q.defer();
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'PUT',
                url: personUrl+'/'+id,
                data:'name='+name
            }).success(function(res){
                deffered.resolve();
            }).error(function (res) {
                deffered.reject(res.message);
            });
            return deffered.promise;
        }
    }
});