(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('ProductCtrl', ['$scope', '$routeParams', 'ProductModelService', function($scope, $routeParams, ProductModelService) {

    $scope.product = {};

    $scope.getProduct = function() {
      var productId = $routeParams.productId;
      return ProductModelService.getProductById(productId).then(function(product) {
        $scope.product = product;
      });
    };

  }]);

})();
