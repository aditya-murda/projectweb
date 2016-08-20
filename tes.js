var module = angular.module('myApp', []);
module.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {};
    $scope.user.username = '';
    $http({
        method: 'POST',
        url: 'http://localhost:3000/login'
    })
        .success(function(data, status, headers, config) {
            if( data ) {
                $scope.members= data;
            }
            else {
            }
        })
        .error(function(data, status, headers, config) {
            console.log(status);
        });
}]);
