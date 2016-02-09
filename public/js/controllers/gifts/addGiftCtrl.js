app.controller('addGiftCtrl',['$scope','giftsService','$location','peopleService','$timeout',function($scope,giftsService,$location,peopleService,$timeout){

    var marker;

    document.title = 'Add gift';
    $scope.gift = {};

    $timeout(function(){
        var map;

        var myCenter=new google.maps.LatLng(42.63345355842104,24.354286193847656);//42.22851735620852,25.224609375

        function initialize()
        {
            var mapProp = {
                center:myCenter,
                zoom:5,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

            google.maps.event.addListener(map, 'click', function(event) {
                placeMarker(event.latLng);
                console.log("Lat: " + marker.getPosition().lat() + " and Lng " + marker.getPosition().lng());
            });
        }

        initialize();

        function placeMarker(location) {
            if ( marker ) {
                marker.setPosition(location);
            } else {
                marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
            }
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    },1000);

    $scope.addGift = function(){
        var drop = document.getElementById("dropdown-person");
        $scope.gift.id  = drop.options[drop.selectedIndex].value;
        $scope.gift.name =$('#gift-name').val(),
            $scope.gift.price =$('#gift-price').val(),
            $scope.gift.type = "jpg";
        if($scope.gift.name === "" || $scope.gift.price === "" || marker === undefined){
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.status = "Error";
            $scope.message = "Please , enter information about the gift!";
        }
        else{
            $scope.gift.price = accounting.formatMoney($scope.gift.price);
            $('#successStat').css('display','block');
            $('#errorStat').css('display','none');
            $scope.status = "Success";
            $scope.message = "Gift created!";
        }
        giftsService.createGift($scope.gift);
    };

    $scope.people = peopleService.getPeople().then(getData);

    function getData(data){
        $scope.people = data;
    }

    $scope.cancel = function(){
        $location.path('/gifts');
    };

    function validatePrice(price){
        var re = /^[0-9]+$/i;
        return re.test(price);
    }

}]);