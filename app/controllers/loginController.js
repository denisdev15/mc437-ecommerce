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
        console.log('payload');
        if (response.payload) {
          console.log(response);
          AuthenticationService.SetCredentials(response.id, response.token);
          $location.path('/home');
        } else {
          FlashService.Error(response);
          $scope.dataLoading = false;
        }
      });
    }

  }]);

})();
