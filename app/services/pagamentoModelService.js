(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'https://orangopag.herokuapp.com/index.php/api/Transacoes';
  var config = {headers:  {
        'Content-Type': 'application/json'}
  };

  app
  .factory('PagamentoModelService', PagamentoModelService);

  PagamentoModelService.$inject = ['$http', '$log', '$q'];
  function PagamentoModelService($http, $log, $q) {
    var service = {};


    service.postBoletoBancario = postBoletoBancario;
    service.postCartaoCredito = postCartaoCredito;
    service.postCartaoDebito = postCartaoDebito;
    service.getTransacaoByID = getTransacaoByID;
    service.getTodasTransacao = getTodasTransacao;

    return service;

    // Gerar Boleto Bancário:
    // valor_total = 125.00
    // cnpj_loja =
    // formatc= json
    // api_key =
    // tipo_trans = (1 - boleto)
    // nome_sacado
    // cpf_sacado
    function postBoletoBancario(boleto){
      boleto.tipo_trans = 1;
      console.log(client);
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url,
        data: boleto,
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


    // Gerar pagamento com Cartão de Crédito
    // valor_total
    // cnpj_loja
    // format
    // api_key
    // tipo_trans (2- credito)
    // numero_cartao
    // nome_cartao
    // data_expiracao
    // codigo_verificaccao
    // tipo_cartao
    // n_parcelas
    // valor_parcela
    function postCartaoCredito(cartaoCredito){
      cartaoCredito.tipo_trans = 2;
      console.log(client);
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url,
        data: cartaoCredito,
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

    // Gerar pagamento com Cartão de Débito
    // valor_total
    // cnpj_loja
    // format
    // api_key
    // tipo_trans (3- debito)
    // numero_cartao
    // nome_cartao
    // data_expiracao
    // codigo_verificaccao
    // tipo_cartao

    function postCartaoDebito(cartaoDebito){
      cartaoCredito.tipo_trans = 3;
      console.log(client);
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url,
        data: cartaoDebito,
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

    // Buscar uma transação por ID
    // id_trans
    // cnpj_loja
    // format
    // api_key

    function getTransacaoByID(id_transacao){

      var deferred = $q.defer();
      $http({
        method:'GET',
        url: url + '?cnpj_loja=45377560000106&format=json&api_key=67f0d3db613474578aed11f37c7f219e&id_trans=' + id_transacao,
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

    // Buscar todas as transações
    function getTodasTransacao(){

      var deferred = $q.defer();
      $http({
        method:'GET',
        url: url + 'cnpj_loja=45377560000106&format=json&api_key=67f0d3db613474578aed11f37c7f219e',
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

  }

})();