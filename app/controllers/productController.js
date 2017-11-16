(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('ProductCtrl', ['$scope', '$routeParams', 'ProductModelService', function($scope, $routeParams, ProductModelService) {

    $scope.product = {};

    $scope.addCart = function(productId) {
      console.log("oi");
      if (!($scope.cart instanceof Array)) {
        $scope.cart = [];
      }

      var found = false;
      angular.forEach($scope.cart, function(value, key){
        if (!found && value.productId == productId) {
          value.qtd = value.qtd + 1;
          found = true;
        }
      });
      if (!found) {
        $scope.cart.push({"productId" : productId, "qtd" : 1});
      }
      console.log($scope.cart);
    };

    $scope.getProduct = function() {
      var productId = $routeParams.productId;
      return ProductModelService.getProductById(productId).then(function(product) {
        $scope.product = product;
      });
    };

  }]);

})();
