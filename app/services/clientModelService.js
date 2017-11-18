(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'http://mc437.ddns.net:5000/';
  var config = {headers:  {
        'Content-Type': 'application/json'}
  };

  app
  .factory('ClientModelService', ClientModelService);

  ClientModelService.$inject = ['$http', '$log', '$q'];
  function ClientModelService($http, $log, $q) {
    var service = {};


    service.createNewClient = createNewClient;
    service.addAddress = addAddress;
    service.authenticateClient = authenticateClient;
    service.getClient = getClient;
    service.deleteClient = deleteClient;
    service.editClient = editClient;
    service.getAddress = getAddress;
    service.deleteAddress = deleteAddress;
    service.editAddress = editAddress;

    return service;

    // Objeto client tudo como string - username, name, *password, *cpf, phone, email
    function createNewClient(client){
      console.log(client);
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url + 'client',
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

// authClient -> passar o objeto do cliente autenticado (token, id)
// address -> passar objeto com: cep (string), number (integer)
    function addAddress(authClient, address){
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url + 'address/'+ authClient.id,
        data: adress,
        headers: {'Content-Type': 'application/json',
                    'X-Access-Token': authClient.token}
      })
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        console.log(response);
        deferred.reject({});
      });
      return deferred.promise;
    }

// objeto client -> username: (cpf do cliente), password: (string)
// retorna objeto do usuário autenticado contendo: token e id
    function authenticateClient(client){
      console.log(client);
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url + 'client/auth',
        data: client,
        headers: {'Content-Type': 'application/json'}
      })
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        console.log(response);
        deferred.reject({});
      });
      return deferred.promise;
    }


  // objeto authClient -> objeto obtido pela autenticação do usuário
  // contendo token e id.
  // A função retorna os dados do usuário
    function getClient(authClient){
      var deferred = $q.defer();
      $http({
        method:'GET',
        url: url + 'client/' + authClient.id,
        headers: {'Content-Type': 'application/json',
                  'X-Access-Token': authClient.token}
      })
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        console.log(response);
        deferred.reject({});
      });
      return deferred.promise;
    }

  // objeto authClient -> objeto obtido pela autenticação do usuário
  // contendo token e id.
  // A função retorna payload vazio, caso obtenha sucesso.
    function deleteClient(authClient){
      var deferred = $q.defer();
      $http({
        method:'DELETE',
        url: url + 'client',
        headers: {'Content-Type': 'application/json',
                  'X-Access-Token': authClient.token}
      })
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        console.log(response);
        deferred.reject({});
      });
      return deferred.promise;
    }


  // objeto authClient -> objeto obtido pela autenticação do usuário
  // contendo token e id.
  // objeto client -> objeto com as informações a serem atualizadas.
  // contendo: username (string), name (string), password (string), phone (string),
  // cpf (string), email (string).
    function editClient(authClient, client){
      var deferred = $q.defer();
      $http({
        method:'PUT',
        url: url + 'client/'+ authClient.id,
        data: client,
        headers: {'Content-Type': 'application/json',
                  'X-Access-Token': authClient.token}
      })
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        console.log(response);
        deferred.reject({});
      });
      return deferred.promise;
    }

  // objeto authClient -> objeto obtido pela autenticação do usuário
  // contendo token e id.
    function getAddress(authClient){
      var deferred = $q.defer();
      $http({
        method:'GET',
        url: url + 'address/'+ authClient.id,
        headers: {'Content-Type': 'application/json',
                  'X-Access-Token': authClient.token}
      })
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        console.log(response);
        deferred.reject({});
      });
      return deferred.promise;
    }

  // objeto authClient -> objeto obtido pela autenticação do usuário
  // contendo token e id.
  // adressID -> o ID do endereço que deseja apagar.
    function deleteAddress(authClient, addressID){
      var deferred = $q.defer();
      $http({
        method:'DELETE',
        url: url + 'address/'+ addressID,
        headers: {'Content-Type': 'application/json',
                  'X-Access-Token': authClient.token}
      })
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        console.log(response);
        deferred.reject({});
      });
      return deferred.promise;
    }

  // objeto authClient -> objeto obtido pela autenticação do usuário
  // contendo token e id.
  // address -> passar objeto com: cep (string), number (integer)
  // adressID -> o ID do endereço que deseja apagar.
    function editAddress(authClient, address, addressID){
      var deferred = $q.defer();
      $http({
        method:'PUT',
        url: url + 'address/'+ addressID,
        data: address,
        headers: {'Content-Type': 'application/json',
                  'X-Access-Token': authClient.token}
      })
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(response) {
        console.log(response);
        deferred.reject({});
      });
      return deferred.promise;
    }

  }

})();
