(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('NavCtrl', ['$scope', '$location', '$rootScope', 'AuthenticationService', function($scope, $location, $rootScope, AuthenticationService) {
    $scope.search = '';

    $scope.checkPage = function() {
      if($rootScope.globals.currentUser) {
        $scope.userLogged = true;
      }
      else {
        $scope.userLogged = false;
      }

      var location = $location.path();
      if(location == "/login" || location == "/register") {
        return false;
      }
      else {
        return true;
      }
    }

    $scope.submitSearch = function() {
      $location.path('/search/' + $scope.search);
    };

    $scope.logout = function() {
      AuthenticationService.ClearCredentials();
    };

  }]);

})();
