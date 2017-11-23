(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('CheckoutCtrl', ['$scope', '$rootScope', '$routeParams', 'ProductModelService', 'PagamentoModelService', 'ClientModelService', function($scope, $rootScope, $routeParams, ProductModelService, PagamentoModelService, ClientModelService) {
    $scope.method = 'cartao';

    $scope.client = {};

    $scope.init = function() {
      var authClient = getAuthClient();
      return ClientModelService.getClient(authClient).then(function(client) {
        $scope.client = client.payload;
        return ClientModelService.getAddress(authClient).then(function(response) {
          if(response['error_code']) {
            $scope.client.address = {};
          }
          else {
            $scope.client.address = response.payload.addresses[0];
          }
        });
      });
    };

    $scope.pay = function() {
      if($scope.method === 'cartao') {
        $scope.cartao_credito.data_expiracao = '20' +  $scope.data_expiracao_ano + '-' + $scope.data_expiracao_mes + '-' + '01';
        $scope.cartao_credito.valor_total = $rootScope.total;
        return PagamentoModelService.postCartaoCredito($scope.cartao_credito).then(function(response) {
          console.log(response);
        });
      }
      else if($scope.method === 'boleto') {

      }
    };

    function getAuthClient() {
      return $rootScope.globals.currentUser;
    }


  }]);
})();
