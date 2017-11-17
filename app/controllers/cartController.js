(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('CartCtrl', ['$scope', '$rootScope', '$routeParams', 'ProductModelService', 'CepModelService' , function($scope, $rootScope, $routeParams, ProductModelService, CepModelService) {
    $scope.products = [];
    $rootScope.frete = null;
    $scope.getCart = function() {
      $scope.total = 0;
      angular.forEach($rootScope.cart, function(value, key){
        ProductModelService.getProductById(value.productId).then(function(product) {
          product.qtd = value.qtd;
          product.total = product.price * product.qtd;
          $scope.products.push(product);
          console.log($scope.products);
          $scope.total += product.total;
        });
      });
      console.log($rootScope.cart);
      console.log("cart");
    }
    
    $scope.productChange = function(productId, ammount) {
      $scope.total = 0;
      console.log("id" + productId);
      angular.forEach($rootScope.cart, function(value, key){
        if (value.productId == productId) {
          value.qtd = value.qtd + ammount;
          if (value.qtd < 1) {
            $rootScope.cart.splice(key,1);
          }
        }
      });
      $scope.products = [];
      $scope.getCart();
    }
    
    $scope.calcShipping = function() {
      $rootScope.frete = CepModelService.getCep($scope.cep).then(function(payload) {
        console.log(payload);
//      $rootScope.frete 
      });
    }

  }]);
})();
