(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('CheckoutCtrl', ['$scope', '$rootScope', '$routeParams', 'ProductModelService', function($scope, $rootScope, $routeParams, ProductModelService) {
    $scope.method = 'cartao';
    


  }]);
})();
