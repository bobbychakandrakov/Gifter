app.controller('editGiftCtrl',['$scope','peopleService','$location','giftsService','$routeParams','$timeout',function($scope,peopleService,$location,giftsService,$routeParams,$timeout){

    document.title = 'Edit gift';

    var gift, marker;
    var map;

    $scope.people = peopleService.getPeople().then(getData);

    function getData(data){
        $scope.people = data.data.people;
    }

    var id = $routeParams.id;

    giftsService.getGift(id,function(data){
        gift = data;
        $scope.gift = gift;
    });

    $scope.cancel = function(){
        $location.path('/gifts');
    };

    $scope.editGift = function(){
        var name = $('#gift-name').val(),
            price = $('#gift-price').val(),
            owner = document.getElementById('dropdown-person').value;
        if(name === "" || price === "" || owner === '0' || marker === undefined){
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.status = "Error";
            $scope.message = "Please , enter valid information about the gift!";
        }else{
            giftsService.updateGift(name,price,id,owner,marker.getPosition().lat(),marker.getPosition().lng());
            $location.path('/gifts');
        }
    };

    $scope.changeName = function(){
        var name = $('#gift-name').val();
        if(name === ""){
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.status = "Error";
            $scope.message = "Please , enter valid name!";
        }else{
            giftsService.updateGiftName(id,name);
            $('#errorStat').css('display','none');
            $('#successStat').css('display','block');
            $scope.status = "Success";
            $scope.message = "Gift name changed!";
        }

    };

    $scope.changePrice = function(){
        var price = $('#gift-price').val();
        if(price === ""){
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.status = "Error";
            $scope.message = "Please , enter valid price!";
        }else{
            giftsService.updateGiftPrice(id,price);
            $('#errorStat').css('display','none');
            $('#successStat').css('display','block');
            $scope.status = "Success";
            $scope.message = "Gift price changed!";
        }
    };

    $scope.changeOwner = function(){
        var owner = document.getElementById('dropdown-person').value;
        if(owner !== '0'){
            giftsService.updateGiftOwner(id,owner);
            $('#errorStat').css('display','none');
            $('#successStat').css('display','block');
            $scope.status = "Success";
            $scope.message = "Gift owner changed!";
        }else{
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.status = "Error";
            $scope.message = "Please , enter a owner!";
        }
    };

    $scope.changeAddress = function () {
        if(marker === undefined){
            $('#errorStat').css('display','block');
            $('#successStat').css('display','none');
            $scope.status = "Error";
            $scope.message = "Please , enter a place!";
        }else{
            giftsService.updateGiftAddress(id,marker.getPosition().lat(),marker.getPosition().lng());
            $('#errorStat').css('display','none');
            $('#successStat').css('display','block');
            $scope.status = "Success";
            $scope.message = "Gift address changed!";
        }
    };

    $timeout(function(){

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