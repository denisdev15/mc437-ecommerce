(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('HomepageCtrl', ['$scope', 'ProductModelService', function($scope, ProductModelService) {

    $scope.products = [];

    $scope.getProducts = function() {
      return ProductModelService.getProductsHighlighted().then(function(response) {
        $scope.products = response;
      });
    };

  }]);

})();
