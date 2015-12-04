app.controller('addGiftCtrl',['$scope','giftsService','$location','peopleService','$timeout',function($scope,giftsService,$location,peopleService,$timeout){
    var marker;
    document.title = 'Add gift';
    $timeout(function(){
        var map;
        var myCenter=new google.maps.LatLng(42.22851735620852,25.224609375);
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
        console.log(marker);
        console.log("IN TIMEOUT!");
        google.maps.event.addDomListener(window, 'load', initialize);
    },1000);

    $scope.addGift = function(){
        var drop = document.getElementById("dropdown-person");
        var personId = drop.options[drop.selectedIndex].value;
        var name =$('#gift-name').val(),
            price =$('#gift-price').val();
        console.log(marker.getPosition().lng());
        if(marker === undefined){
            giftsService.createGift(name,price,personId);
        }else{
            giftsService.createGift(name,price,personId,marker.getPosition().lat(),marker.getPosition().lng());
        }


    };

    $scope.people = peopleService.getPeople().then(getData);

    function getData(data){
        $scope.people = data.data.people;
    }

    $scope.cancel = function(){
        $location.path('/gifts');
    };

}]);