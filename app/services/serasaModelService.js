(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'http://mc437.viniciusfabri.com/';
  var config = {headers:  {
        'Content-Type': 'application/json'}
  };

  app
  .factory('SerasaModelService', SerasaModelService);

  SerasaModelService.$inject = ['$http', '$log', '$q'];
  function SerasaModelService($http, $log, $q) {
    var service = {};


    service.addNovaPessoa = addNovaPessoa;
    service.updatePessoa = updatePessoa;
    service.addCobranca = addCobranca;
    service.updateCobranca = updateCobranca;
    service.consultarCPF = consultarCPF;

    return service;


// Adicionar Registro de uma nova pessoa
// objeto cliente contendo:
// {
//   "api_key": "mc437_key_2017",
//   "cpf": "1111111111",
//   "name": "name of person",
//   "street": "street name",
//   "neighborhood": "neighborhood name",
//   "city": "city name",
//   "state": "sp"
// }
    function addNovaPessoa(client){
      client.api_key="mc437_key_2017";
      console.log(client);
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url + 'sc/api/person',
        data: client,
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

    // Atualizar Registro de uma pessoa
    // objeto cliente contendo:
    // {
    //   "api_key": "mc437_key_2017",
    //   "cpf": "1111111111",
    //   "name": "name of person",
    //   "street": "street name",
    //   "neighborhood": "neighborhood name",
    //   "city": "city name",
    //   "state": "sp"
    // }
        function updatePessoa(client){
          client.api_key="mc437_key_2017";
          console.log(client);
          var deferred = $q.defer();
          $http({
            method:'PATCH',
            url: url + 'sc/api/person',
            data: client,
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

        // Adicionar Cobrança a uma nova pessoa
        // objeto cobranca contendo:
        // {
        //   "api_key": "mc437_key_2017",
        //   "cpf": "1234567890",
        //   "date_purchase": "DD/MM/AAAA",
        //   "date_limit": "DD/MM/AAAA",
        //   "value": "123.00",
        //   "invoice_id": "666",
        // }
            function addCobranca(cobranca){
              cobranca.api_key="mc437_key_2017";
              console.log(client);
              var deferred = $q.defer();
              $http({
                method:'POST',
                url: url + 'sc/api/charge',
                data: cobranca,
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

            // Atualizar Cobrança de uma pessoa
            // objeto cobranca contendo:
            // {
            //   "api_key": "mc437_key_2017",
            //   "cpf": "1234567890",
            //   "invoice_id": "666",
            //   "paid_when": "DD/MM/AAAA"
            // }
                function updateCobranca(cobranca){
                  cobranca.api_key="mc437_key_2017";
                  console.log(client);
                  var deferred = $q.defer();
                  $http({
                    method:'PATCH',
                    url: url + 'sc/api/charge',
                    data: cobranca,
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

                // Consultar score de uma pessoa por CPF
                // entrada: cpf
                // entrar com CPF da pessoa que deseja consultar
                // retorna Score de calotes das pessoas onde:
                // 0 ->; 1->; 2-> ; 3->;...
                    function consultarCPF(cpf){
                      console.log(client);
                      var deferred = $q.defer();
                      $http({
                        method:'GET',
                        url: url + 'sc/api/score/mc437_key_2017/' + cpf,
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
