(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'http://ec2-54-207-63-160.sa-east-1.compute.amazonaws.com:3000/';

  app
  .factory('OrderModelService', OrderModelService);

  OrderModelService.$inject = ['$http', '$log', '$q'];
  function OrderModelService($http, $log, $q) {
    var service = {};

    service.getOrders = getOrders;
    service.createOrder = createOrder;

    return service;

    function getOrders(userId) {
      var deferred = $q.defer();
      $http.get(url + 'orders/' + userId)
      .success(function(response) {
        $log.info(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        $log.error(response);
        deferred.reject([]);
      });
      return deferred.promise;
    }

    function createOrder(order){
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url + 'orders',
        data: order,
        headers: {'Content-Type': 'application/json'}
      })
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        console.log(response);
        deferred.reject(response);
      });

      return deferred.promise;
    }

  }

})();
