(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'http://mc437-cep.herokuapp.com/s/cep/';
  var config = {headers:  {
        'auth-token': 'mN5E52087AdquCg7XraJNpxy8G3qhNFi0PXso6G0gi0DJmchfvjfwejebhKKx60i'}
  };

  app
  .factory('CepModelService', CepModelService);

  CepModelService.$inject = ['$http', '$log', '$q'];
  function CepModelService($http, $log, $q) {
    var service = {};

    service.getCep = getCep;

    return service;


    function getCep(cep) {
      var deferred = $q.defer();
      $http.get(url + cep, config)
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

  }

})();
