var mainApp = angular.module('mainApp', []);

mainApp.controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
  $scope.loading = false;
  $scope.articles = [];
  $scope.query = "";

  var timeoutPromise;

  $scope.search = function() {
    $timeout.cancel(timeoutPromise);

    timeoutPromise = $timeout(function() {
      $scope.loading = true;

      $http({
        url: '/api/',
        params: {search: $scope.query},
        method: 'GET'
      })
        .success(function(data, status, headers, config) {
          $scope.articles = data;
          $scope.loading = false;
        })
        .error(function(data, status, headers, config) {
          console.log(data);
          $scope.loading = false;
        });
    }, 800);
  }
}]);
