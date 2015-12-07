/**
 * Created by QuadCore on 11/18/2015.
 */
app.factory('peopleService', function($location,$http){
    const personUrl = 'http://localhost:8080/api/person',
        gifterToken='gifter-access-token';
    return {
        createPerson: function(personName){
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'POST',
                url: personUrl,
                data:'name='+personName
            }).success(function(res){
                if(res.success){

                }else{

                }
            });
        },
        getPeople:function(){
             return $http({
                    headers:
                    {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                    },
                    method: 'GET',
                    url: personUrl
                }).success(function(res){
                    if(res.success){
                        return res.people;
                    }else{
                    console.log('No people');
                }
            });
        },
        deletePerson:function(id){
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'DELETE',
                url: personUrl + '/' + id
            }).success(function(res){
                if(res.success){
                    console.log("Person deleted");
                }else{

                }
            });
        },
        getPerson: function (id) {
            return $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'GET',
                url: personUrl+'/'+id
            }).success(function(res){
                if(res.success){
                    return res.name;
                }else{
                    console.log('No people');
                }
            });
        },
        updataPerson: function (id,name) {
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'PUT',
                url: personUrl+'/'+id,
                data:'name='+name
            }).success(function(res){
                if(res.success){
                    console.log("Person changed name!");
                }else{
                    console.log('Not changed');
                }
            });
        }
    }
});