(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'http://ec2-54-207-63-160.sa-east-1.compute.amazonaws.com:3000/';

  app
  .factory('ProductModelService', ProductModelService);

  ProductModelService.$inject = ['$http', '$log', '$q'];
  function ProductModelService($http, $log, $q) {
    var service = {};

    service.getAllProducts = getAllProducts;
    service.getProductById = getProductById;
    service.getProductsHighlighted = getProductsHighlighted;
    service.searchByName = searchByName;

    return service;

    function getAllProducts() {
      var deferred = $q.defer();
      $http.get(url + 'products')
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

    function getProductById(id) {
      var deferred = $q.defer();
      $http.get(url + 'products/' + id)
      .success(function(response) {
        $log.info(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        $log.error(response);
        deferred.reject({});
      });
      return deferred.promise;
    }

    function getProductsHighlighted() {
      var deferred = $q.defer();
      $http.get(url + 'products?group=2&highlighted=true&enabled=true')
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

    function searchByName(name) {
      var deferred = $q.defer();
      $http.get(url + 'products?group=2&enabled=true&name=' + name)
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


  }

})();
