(function() {
  'use strict';

  var app = angular.module('app');

  //UserService

  app
  .controller('ProfileCtrl', ['FlashService', '$location', '$scope', function(FlashService, $location, $scope) {
    $scope.getProfile = function() {
      // TODO
      // Requisicao get Client, get Address(c_id)
      //Fazer requiziçoes para logistica, pagamento e cliente
      $scope.user = {
        name: 'João das Neves',
        email: 'joao_neves@email.com',
        cpf: 'XXX.XXX.XXX-XX',
        pwd: 'senha',
        street: 'Rua Bla',
        number: '9',
        city: 'Sao Paulo',
        state: 'Sao Paulo',
        CEP: '09876543',
      }
    };

  }]);

})();
