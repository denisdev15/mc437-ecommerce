(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('CartCtrl', ['$scope', '$routeParams', 'ProductModelService', function($scope, $routeParams, ProductModelService) {

    $scope.getCart = function() {
      angular.forEach($scope.cart, function(value, key){
        ProductModelService.getProductById(value.productId).then(function(product) {
          product.qtd = value.qtd;
          product.total = product.price * product.qtd;
          $scope.products.push(product);
        });
      });
      console.log($scope.cart);
      console.log("cart");
    }
  }]);

})();
