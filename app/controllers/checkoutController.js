(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('CheckoutCtrl', ['$scope', '$rootScope', '$routeParams', 'FlashService', 'ProductModelService', 'PagamentoModelService', 'ClientModelService', 'OrderModelService', 'CepModelService', 'LogisticModelService', '$location', function($scope, $rootScope, $routeParams, FlashService, ProductModelService, PagamentoModelService, ClientModelService, OrderModelService, CepService, LogisticModelService, $location) {
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
      console.log($rootScope.products);
      var products = [];
      products.push($rootScope.products[0]);
      $scope.order = {
        products: products,
        price: $rootScope.total,
        userId: $rootScope.globals.currentUser.id
      };
      if($scope.method === 'cartao') {
        $scope.cartao_credito.data_expiracao = '20' +  $scope.data_expiracao_ano + '-' + $scope.data_expiracao_mes + '-' + '01';
        $scope.cartao_credito.valor_total = $rootScope.total;
        // return PagamentoModelService.postCartaoCredito($scope.cartao_credito).then(function(response) {
          // if(response.msg === 'Transação via credito criada com sucesso') {
            $scope.order.paymentId = 1161; // TODO cravar id
            // var p = $rootScope.products[0];
            // var volume = p.dimensions[0] * p.dimensions[1] * p.dimensions[2];
            // var pacote = {
            //   volume: volume,
            //   destinatario: $scope.client.name,
            //   destino_cep: parseInt($scope.client.address.cep),
            //   destino_numero: $scope.client.address.number,
            //   destino_estado: $scope.client.address.state,
            //   destino_cidade: $scope.client.address.city,
            //   destino_endereco: $scope.client.address.street
            // };
            // console.log(pacote);
            // return LogisticModelService.postarProduto(pacote).then(function(response) {
            //   console.log(response);
              $scope.order.shippingId = 1; //Cravar id
              console.log($scope.order);
              return OrderModelService.createOrder($scope.order).then(function(response) {
                $scope.loading = false;
                $rootScope.cart = [];
                $rootScope.cep = "";
                FlashService.Success("Compra efetuada com sucesso. Aguardando resposta do provedor de cartão de crédito.", true);
                $location.path("#/home");
                // decrease product qntd
              });
            // });

          // }
          // else {
            // if(response.msg !== null) {
            //   FlashService.Error(response.msg);
            //   $scope.loading = false;
            // }
            // else {
              // FlashService.Error('Erro: Não foi possível realizar o pagamento.');
              // $scope.loading = false;
            // }
          // }
        // });
      }
      else if($scope.method === 'boleto') {
        var obj = {
          valor_total: $rootScope.total,
          cpf_sacado: $scope.client.cpf,
          nome_sacado: $scope.client.name
        };

        // return PagamentoModelService.postBoletoBancario(obj).then(function(response) {
          // if(response.msg === 'Transação via boleto criada com sucesso') {
          // var p = $rootScope.products[0];
          // var volume = p.dimensions[0] * p.dimensions[1] * p.dimensions[2];
          // var pacote = {
          //   volume: volume,
          //   destinatario: $scope.client.name,
          //   destino_cep: $scope.client.address.cep,
          //   destino_numero: $scope.client.address.number,
          //   destino_estado: $scope.client.address.state,
          //   destino_cidade: $scope.client.address.city,
          //   destino_endereco: $scope.client.address.street
          // };
          // console.log(pacote);
          $scope.order.paymentId = 1151;

          // return LogisticModelService.postarProduto(pacote).then(function(response) {
          //   console.log(response);
            $scope.order.shippingId = 1;
            console.log($scope.order);
            return OrderModelService.createOrder($scope.order).then(function(response) {
              $scope.loading = false;
              $rootScope.cart = [];
              $rootScope.cep = "";
              FlashService.Success("Compra efetuada com sucesso. Aguardando pagamento de boleto.", true);
              $location.path("#/home");
              // decrease product qntd
            });
          // }
          // else {
          //   if(response.msg !== null) {
          //     FlashService.Error(response.msg);
          //     $scope.loading = false;
          //   }
          //   else {
          //     FlashService.Error('Erro: Não foi possível realizar o pagamento.');
          //     $scope.loading = false;
          //   }
          // }
        // });
      }
    };

    function getAuthClient() {
      return $rootScope.globals.currentUser;
    }


  }]);
})();
