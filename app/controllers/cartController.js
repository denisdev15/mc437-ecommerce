(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('CartCtrl', ['$scope', '$routeParams', 'ProductModelService', function($scope, $routeParams, ProductModelService) {

    $scope.cart = [
      {"productId" : "5a0370e8f60327670a074edf", "qtd" : 1},
      {"productId" : "5a03a80df60327670a074ee5", "qtd" : 1},
    ];

    $scope.products = [];

    $scope.getCart = function() {
      angular.forEach($scope.cart, function(value, key){
        ProductModelService.getProductById(value.productId).then(function(product) {
          product.qtd = value.qtd;
          product.total = product.price * product.qtd;
          $scope.products.push(product);
        });
      });
    }


    $scope.getProduct = function() {
      var productId = $routeParams.productId;
      return ProductModelService.getProductById(productId).then(function(product) {
        $scope.product = product;
      });
    };

  }]);

})();
