app.controller('giftsCtrl',['$scope','peopleService','$location','giftsService','$window',function($scope,peopleService,$location,giftsService,$window){

    document.title = 'Gifts';

    $scope.pageSize = 5;

    $scope.currentPage = 1;

    var len;

    $scope.orderByName = function () {
        if($scope.order === 'name'){
            $scope.order = "-name";
        }else{
            $scope.order = 'name';
        }
    };

    $scope.orderByPrice = function () {
        if($scope.order === 'price'){
            $scope.order = "-price";
        }else{
            $scope.order = 'price';
        }
    };

    $scope.orderByOwner = function () {
        if($scope.order === 'ownerName'){
            $scope.order = "-ownerName";
        }else{
            $scope.order = 'ownerName';
        }
    };

    giftsService.getGifts().then(function(data){
        $scope.gifts = data.gift;
    },function(err){
        console.log(err);
    });

    $scope.deleteGift = function(id){

        bootbox.confirm("Are you sure you want to delete this gift?", function (answer) {
            if(answer === true){
                giftsService.deleteGift(id);
                len--;
                $scope.gifts = giftsService.getGifts().then(function(data){
                    $scope.gifts = data.gift;
                    len = $scope.gifts.length;
                });
            }
        });
    };

    $scope.showTable = function(){
        return !($scope.gifts === undefined || $scope.gifts.length == 0 || len == 0);
    };

    $scope.showMessage = function(){
        return !!($scope.gifts === undefined || $scope.gifts.length == 0 || len == 0);
    };

    $scope.goToHome = function () {
        $location.path('/home');
    };

    $scope.goToPeople = function () {
        $location.path('/people');
    };

}]);