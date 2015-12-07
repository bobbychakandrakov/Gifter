app.controller('giftsCtrl',['$scope','peopleService','$location','giftsService',function($scope,peopleService,$location,giftsService){

    document.title = 'Gifts';
    var len;

    $scope.pageSize = 5;
    $scope.currentPage = 1;

    $scope.gifts = giftsService.getGifts().then(function(data){
        $scope.gifts = data.data.gift;
        len = $scope.gifts.length;
    });

    setInterval(function () {
        $('.delete').click(function(e){
            $(this).closest('tr').remove();
        });
    },1000);

    $scope.deleteGift = function(id){
        giftsService.deleteGift(id);
        console.log(len);
        len--;
    };

    $scope.showTable = function(){
        return !($scope.gifts === undefined || $scope.gifts.length == 0 || len == 0);
    };

    $scope.showMessage = function(){
        return !!($scope.gifts === undefined || $scope.gifts.length == 0 || len == 0);
    };

}]);