app.controller('peopleCtrl',['$scope','peopleService','$location',function($scope,peopleService,$location){

    document.title = 'People';

    var len,
        sortByNameBool = true,
        peopleLen,
        people;

    $scope.pageSize = 5;

    $scope.currentPage = 1;

    $scope.people = peopleService.getPeople().then(function (data) {
        $scope.people = data;
        people = data;
        len = data.length;
        peopleLen = data.length;
    });

    $scope.showTable = function(){
        return !($scope.people === undefined || $scope.people.length == 0 || len == 0);
    };

    $scope.showMessage = function(){
        return !!($scope.people === undefined || $scope.people.length == 0 || len == 0);
    };


    $scope.deletePerson = function (id) {
        bootbox.confirm("Are you sure you want to delete this person?", function (answer) {
            if(answer === true){
                peopleService.deletePerson(id).then(function () {
                    for(var i =0; i < peopleLen; i++){
                        if(id == people[i]._id){
                            people.splice(i,1);
                            peopleLen--;
                            len--;
                            break;
                        }
                    }
                    $scope.people = people;
                }, function (err) {
                    console.log(err);
                });
                //$scope.people = peopleService.getPeople().then(function (data) {
                //    $scope.people = data;
                //});
            }
        });

    };

    $scope.predicate = 'name';
    $scope.reverse = false;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
        if(sortByNameBool){
            $('#sort-by-alphabet').removeClass('glyphicon glyphicon-sort-by-alphabet');
            $('#sort-by-alphabet').addClass('glyphicon glyphicon-sort-by-alphabet-alt');
            sortByNameBool = false;
        }else{
            $('#sort-by-alphabet').removeClass('glyphicon glyphicon-sort-by-alphabet-alt');
            $('#sort-by-alphabet').addClass('glyphicon glyphicon-sort-by-alphabet');
            sortByNameBool = true;
        }

    };

    $scope.goToGifts = function () {
        $location.path('/gifts');
    };

    $scope.goToProfile = function () {
        $location.path('/profile');
    };

}]);