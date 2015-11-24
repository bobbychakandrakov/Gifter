/**
 * Created by QuadCore on 11/24/2015.
 */
app.factory('giftsService',function($location,$http){
    const giftUrl = "http://localhost:8080/api/gift";
    return {
        createGift: function(name,price,id){
            $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'POST',
                url: giftUrl+'/'+id,
                data:'name='+name+"&price="+price
            }).success(function(res){
                if(res.success){
                    console.log("Gift created!");
                }else{
                    console.log("Gift Creat ERROR!");
                }
            });
        },
        editGift: function(id){
            return $http({
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'gifter-access-token':sessionStorage.getItem('gifter-access-token')
                },
                method: 'GET',
                url: giftUrl+'/'+id
            }).success(function(res){
                if(res.success){

                }else{
                    console.log("Gift Creat ERROR!");
                }
            });
        },
        deleteGift: function () {

        },
        updateGift: function(){

        },
        getGifts: function(){

        },
        getGift: function(){

        }
    }
});