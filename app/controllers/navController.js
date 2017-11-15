(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.search = '';

    $scope.submitSearch = function() {
      $location.path('/search/' + $scope.search);
    };

  }]);

})();
