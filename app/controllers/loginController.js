(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('LoginCtrl', ['ClientModelService', 'AuthenticationService', 'FlashService', '$location', '$scope', function(ClientModelService, AuthenticationService, FlashService, $location, $scope) {

    var init_ = function() {
      $scope.dataLoading = false;
      AuthenticationService.ClearCredentials();
    };

    $scope.login = function() {
      $scope.dataLoading = true;
      ClientModelService.authenticateClient($scope.user).then(function (response) {
        if (! response['error_code']) {
          console.log(response);
          AuthenticationService.SetCredentials(response.payload.id, response.payload.token);
          $location.path('/home');
        } else {
          FlashService.Error(response['error_code']);
          $scope.dataLoading = false;
        }
      });
    }

  }]);

})();
