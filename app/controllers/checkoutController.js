(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('CheckoutCtrl', ['$scope', '$rootScope', '$routeParams', 'FlashService', 'ProductModelService', 'PagamentoModelService', 'ClientModelService', 'OrderModelService', 'CepModelService', 'LogisticModelService', function($scope, $rootScope, $routeParams, ProductModelService, PagamentoModelService, FlashService, ClientModelService, OrderModelService, CepService, LogisticModelService) {
    $scope.method = 'cartao';

    $scope.client = {};

    $scope.init = function() {
      $scope.frete = false;
      var authClient = getAuthClient();
      return ClientModelService.getClient(authClient).then(function(client) {
        $scope.client = {
          cpf: client.payload.cpf,
          name: client.payload.name
        };

        return ClientModelService.getAddress(authClient).then(function(response) {
          if(response['error_code']) {
            $scope.client.address = {};
            $scope.client.address.needCep = true;
          }
          else {
            $scope.client.address = response.payload.addresses[0];
            $scope.client.address.needCep = false;
            $scope.frete = 20;
          }
        });
      });
    };

    $scope.getAdressWithCep = function() {
      CepService.getCep($scope.client.address.cep).then(function(response) {
       if (response != "CEP undefined not found") {
         $scope.client.address.needCep = false;
         $scope.client.address.street = response.value.endereco;
         $scope.getFrete();
       }
     }); 
    };

    $scope.getFrete = function() {
      if ($scope.client.address.cep == '85628140') {
        $scope.frete = 10;
      }
      if ($scope.client.address.cep == '71357514') {
        $scope.frete = 7;
      }
      if ($scope.client.address.cep == '08812347') {
        $scope.frete = 25;
      }
      if ($scope.client.address.cep == '73709449') {
        $scope.frete = 14;
      }
    };


    $scope.pay = function() {
      $scope.loading = true;
      $scope.order = {
        products: $rootScope.products,
        price: $rootScope.total,
        userId: $rootScope.globals.currentUser.id
      };
      if($scope.method === 'cartao') {
        $scope.cartao_credito.data_expiracao = '20' +  $scope.data_expiracao_ano + '-' + $scope.data_expiracao_mes + '-' + '01';
        $scope.cartao_credito.valor_total = $rootScope.total;
        return PagamentoModelService.postCartaoCredito($scope.cartao_credito).then(function(response) {
          if(response.msg === 'Transação via credito criada com sucesso') {
            order.paymentId = response.dados.id_transacao;
            // TODO Logistica
            console.log(order);
            return OrderModelService.createOrder(order).then(function(response) {
              $scope.loading = false;
            });
          }
          else {
            if(response.msg !== null) {
              FlashService.Error(response.msg);
              $scope.loading = false;
            }
            else {
              FlashService.Error('Erro: Não foi possível realizar o pagamento.');
              $scope.loading = false;
            }
          }
        });
      }
      else if($scope.method === 'boleto') {
        var obj = {
          valor_total: $rootScope.total,
          cpf_sacado: $scope.client.cpf,
          nome_sacado: $scope.client.name
        };

        return PagamentoModelService.postBoletoBancario(obj).then(function(response) {
          if(response.msg === 'Transação via boleto criada com sucesso') {
            order.paymentId = response.dados.id_transacao;
            // TODO Logistica
            console.log(order);
            return OrderModelService.createOrder(order).then(function(response) {
              $scope.loading = false;
            });
          }
          else {
            if(response.msg !== null) {
              FlashService.Error(response.msg);
              $scope.loading = false;
            }
            else {
              FlashService.Error('Erro: Não foi possível realizar o pagamento.');
              $scope.loading = false;
            }
          }
        });
      }
    };

    function getAuthClient() {
      return $rootScope.globals.currentUser;
    }


  }]);
})();
