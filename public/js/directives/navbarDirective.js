/**
 * Created by QuadCore on 12/24/2015.
 */
app.directive('myDirective',['$location',function($location){
    return {
        replace:true,
        restrict:'A',
        templateUrl:'templates/navbar.html'
    }
}]);