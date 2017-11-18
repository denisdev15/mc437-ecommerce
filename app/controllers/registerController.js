(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('RegisterCtrl', ['ClientModelService', 'FlashService', '$location', '$scope', function(ClientModelService, FlashService, $location, $scope) {
    $scope.register = function() {
      $scope.dataLoading = true;
      ClientModelService.createNewClient($scope.user).then(function (response) {
        console.log(response);
        if (response.payload) {
          FlashService.Success('Usuário Cadastrado', true);
          $location.path('/login');
        } else {
          FlashService.Error(response['error_code']);
          $scope.dataLoading = false;
        }
      });
    }

  }]);

})();
