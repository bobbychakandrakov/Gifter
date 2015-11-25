app.controller('editGiftCtrl',['$scope','peopleService','$location','giftsService','$routeParams','$timeout',function($scope,peopleService,$location,giftsService,$routeParams,$timeout){
    document.title = 'Edit gift';

    var gift;

    $scope.people = peopleService.getPeople().then(getData);

    function getData(data){
        $scope.people = data.data.people;
    }

    var id = $routeParams.id;

    giftsService.getGift(id,function(data){
        gift = data;
        $scope.gift = gift;
    });

    $scope.editGift = function(){
        var name = $('#gift-name').val(),
            price = $('#gift-price').val(),
            owner = document.getElementById('dropdown-person').value;
        giftsService.updateGift(name,price,id,owner);
    };

    $scope.changeName = function(){
        var name = $('#gift-name').val();
        giftsService.updateGiftName(id,name);
    };

    $scope.changePrice = function(){
        var price = $('#gift-price').val();
        giftsService.updateGiftPrice(id,price);
    };

    $scope.changeOwner = function(){
        var owner = document.getElementById('dropdown-person').value;
        if(owner !== '0'){
            giftsService.updateGiftOwner(id,owner);
        }else{
            //Error message
        }
    };
}]);