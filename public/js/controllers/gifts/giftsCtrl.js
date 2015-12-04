app.controller('giftsCtrl',['$scope','peopleService','$location','giftsService','$timeout',function($scope,peopleService,$location,giftsService,$timeout){

    document.title = 'Gifts';

    $scope.gifts = giftsService.getGifts().then(function(data){
        $scope.gifts = data.data.gift;
    });

    $timeout(function () {
        $('.delete').click(function(e){
            $(this).closest('tr').remove();
        });
    },1000);

    $scope.deleteGift = function(id){
        giftsService.deleteGift(id);
    };

    $scope.showTable = function(){
        return !($scope.gifts === undefined || $scope.gifts.length == 0);
    };

    $scope.showMessage = function(){
        return !!($scope.gifts === undefined || $scope.gifts.length == 0);
    };

}]);