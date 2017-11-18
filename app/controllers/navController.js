(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.search = '';


    $scope.checkPage = function() {
      var location = $location.path();
      console.log(location);
      if(location == "/login" || location == "/register") {
        return false;
      }
      else {
        return true;
      }
    }

    $scope.submitSearch = function() {
      $location.path('/search/' + $scope.search);
    };

  }]);

})();
