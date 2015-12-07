app.controller('editGiftCtrl',['$scope','peopleService','$location','giftsService','$routeParams','$timeout',function($scope,peopleService,$location,giftsService,$routeParams,$timeout){

    document.title = 'Edit gift';

    var gift, marker;

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
        $location.path('/gifts');
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

    $timeout(function(){
        var map;

        var myCenter=new google.maps.LatLng(parseFloat($scope.gift.x), parseFloat($scope.gift.y));//42.22851735620852,25.224609375

        function initialize()
        {
            var mapProp = {
                center:myCenter,
                zoom:12,
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

        placeMarker({lat: parseFloat($scope.gift.x), lng: parseFloat($scope.gift.y)});
        google.maps.event.addDomListener(window, 'load', initialize);
    },1000);

}]);