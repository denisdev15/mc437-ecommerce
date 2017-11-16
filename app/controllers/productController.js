(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('ProductCtrl', ['$scope', '$rootScope', '$routeParams', 'ProductModelService', function($scope, $rootScope, $routeParams, ProductModelService) {

    $scope.product = {};

    $scope.addCart = function(productId) {
      var found = false;
      angular.forEach($rootScope.cart, function(value, key){
        if (!found && value.productId == productId) {
          value.qtd = value.qtd + 1;
          found = true;
        }
      });
      if (!found) {
        $rootScope.cart.push({"productId" : productId, "qtd" : 1});
      }
    };

    $scope.getProduct = function() {
      var productId = $routeParams.productId;
      return ProductModelService.getProductById(productId).then(function(product) {
        $scope.product = product;
      });
    };

  }]);

})();
