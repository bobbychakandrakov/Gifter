/**
 * Created by QuadCore on 11/24/2015.
 */
app.factory('giftsService',function($location,$http,$cookies,$q){
    const giftUrl = "http://localhost:8080/api/gift";
    return {
        createGift: function(name,price,id,x,y,img,type){
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'POST',
                url: giftUrl+"/"+id,
                data:"name="+name+"&price="+price+"&x="+x+"&y="+y+"&imgData="+img+"&type="+type
            }).success(function(res){

            }).error(function(err){
                console.log(err);
            });
        },
        getGift: function(id){
            var deffered = $q.defer();
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'GET',
                url: giftUrl+'/'+id
            }).success(function(res){
                deffered.resolve(res);
            }).error(function (res) {
                deffered.reject(res.message);
            });
        },
        deleteGift: function (id) {
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'DELETE',
                url: giftUrl+'/'+id
            }).success(function(res){
                if(res.success){
                    console.log("Gift deleted!");
                }else{
                    console.log("Gift delete ERROR!");
                }
            });
        },
        updateGift: function(name,price,id,owner,x,y){
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'PUT',
                url: giftUrl+'/'+id,
                data:'name='+name+"&price="+price+'&owner='+owner+"&x="+x+"&y="+y
            }).success(function(res){
                if(res.success){
                    console.log("Gift updated!");
                }else{
                    console.log("Gift Creat ERROR!");
                }
            });
        },
        getGifts: function(){
            return $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'GET',
                url: giftUrl+'s'
            }).success(function(res){
                if(res.success){
                }else{
                    console.log("Gift Creat ERROR!");
                }
            });
        },
        updateGiftName:function(id,name){
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'PUT',
                url: giftUrl+'/name/'+id,
                data:'name='+name
            }).success(function(res){
                if(res.success){
                    console.log("Gift name updated!");
                }else{
                    console.log("Gift Creat ERROR!");
                }
            });
        },
        updateGiftPrice:function(id,price){
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'PUT',
                url: giftUrl+'/price/'+id,
                data:"price="+price
            }).success(function(res){
                if(res.success){
                    console.log("Gift price updated!");
                }else{
                    console.log("Gift Creat ERROR!");
                }
            });
        },
        updateGiftOwner:function(id,owner){
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'PUT',
                url: giftUrl+'/owner/'+id,
                data:'owner='+owner
            }).success(function(res){
                if(res.success){
                    console.log("Gift owner updated!");
                }else{
                    console.log("Gift Creat ERROR!");
                }
            });
        },
        updateGiftAddress:function(id,x,y){
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':$cookies.get('gifter-access-token')
                },
                method: 'PUT',
                url: giftUrl+'/address/'+id,
                data:'x='+x+"&y="+y
            }).success(function(res){
                if(res.success){
                    console.log("Gift address updated!");
                }else{
                    console.log("Gift address ERROR!");
                }
            });
        }
    }
});