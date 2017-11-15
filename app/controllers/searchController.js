(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('SearchCtrl', ['$scope', 'ProductModelService', '$routeParams', function($scope, ProductModelService, $routeParams) {
    $scope.products = [];
    $scope.productsHighlighted = [];

    $scope.getProducts = function() {
      var name = $routeParams.query;
      return ProductModelService.searchByName(name).then(function(response) {
        $scope.products = response;
      });
    };

    $scope.getProductsHighlighted = function() {
      return ProductModelService.getProductsHighlighted().then(function(response) {
        $scope.productsHighlighted = response;
      });
    };

  }]);

})();
