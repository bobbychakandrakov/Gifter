app.controller('addGiftCtrl',['$scope','giftsService','$location','peopleService',function($scope,giftsService,$location,peopleService){
    document.title = 'Add gift';

    $scope.addGift = function(){
        var drop = document.getElementById("dropdown-person");
        var personId = drop.options[drop.selectedIndex].value;
        var name =$('#gift-name').val(),
            price =$('#gift-price').val();
        giftsService.createGift(name,price,personId);
    };

    $scope.people = peopleService.getPeople().then(getData);
    function getData(data){
        $scope.people = data.data.people;
    }
}]);