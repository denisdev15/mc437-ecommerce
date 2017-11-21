(function() {
  'use strict';

  var app = angular.module('app');

  //UserService

  app
  .controller('ProfileCtrl', ['ClientModelService', 'OrderModelService', 'ProductModelService', 'FlashService', '$location', '$scope', '$rootScope', function(ClientModelService, OrderModelService, ProductModelService, FlashService, $location, $scope, $rootScope) {
    $scope.getProfile = function() {
      $scope.dataLoading = true;
      // TODO
      // Requisicao get Client, get Address(c_id)
      //Fazer requiziçoes para logistica, pagamento e cliente

      var authClient = getAuthClient();
      console.log(authClient);

      return getClientInfo(authClient).then(function() {
        // return getOrdersInfo(authClient.id).then(function() {
          $scope.dataLoading = false;
        // });
      });

    };

    $scope.editUser = function() {
      return ClientModelService.editClient(getAuthClient(), $scope.user)
      .then(function(response) {
        if(! response['error_code']) {
          FlashService.Success('Perfil atualizado.');
        }
        else {
          FlashService.Error('Erro: Não foi possível editar o perfil.');
        }
      });
    };

    $scope.editAddress = function() {
      if($scope.hasAddress) {
        var address = {
          cep: $scope.address.cep,
          number: $scope.address.number
        };
        console.log(address);
        return ClientModelService.editAddress(getAuthClient(), address, 0)
        .then(function(response) {
          if(! response['error_code']) {
            $scope.address = response.payload;
            $scope.hasAddress = true;
            FlashService.Success('Endereço atualizado.');
          }
          else {
            FlashService.Error('Erro: Não foi possível editar o endereço.');
          }
        });
      }
      else {
        var address = {
          cep: $scope.address.cep,
          number: $scope.address.number
        };
        console.log(address);
        return ClientModelService.addAddress(getAuthClient(), address)
        .then(function(response) {
          if(! response['error_code']) {
            $scope.address = response.payload;
            $scope.hasAddress = true;
            FlashService.Success('Endereço atualizado.');
          }
          else {
            FlashService.Error('Erro: Não foi possível editar o endereço.');
          }
        });
      }
    };

    $scope.editPassword = function() {
      var user = {
        password: $scope.password
      };
      return ClientModelService.editClient(getAuthClient(), user)
      .then(function(response) {
        if(! response['error_code']) {
          FlashService.Success('Senha atualizada.');
        }
        else {
          FlashService.Error('Erro: Não foi possível atualizar a senha.');
        }
      });
    };

    function getAuthClient() {
      return $rootScope.globals.currentUser;
    }

    function getClientInfo(authClient) {
      return ClientModelService.getClient(authClient).then(function(user) {
        $scope.user = user.payload;
        return ClientModelService.getAddress(authClient).then(function(address) {
          if(address['error_code']) {
            $scope.address = [];
            $scope.hasAddress = false;
          }
          else {
            $scope.address = address[0];
            $scope.hasAddress = true;
          }
        });
      });
    }

    function getOrdersInfo(userId) {
      return OrderModelService.getOrders(userId).then(function(orders) {
        $scope.orders = orders;
        var promises = [];
        var products = [];
        for(var i=0; i<orders.size(); i++) {
          var order = orders[i];
          // TODO Consultar logistica e pagamento
          //   promises.push(
          for (var product in order.products) {
          //     ProductModelService.getProductById(product).then(function(response) {
          //       products.push(response);
          //     });
            products.push(JSON.parse(product));
          // );
          }
          orders[i].products = products;
        }
        return Promise.all(promises);
      });
    }

  }]);

})();
