(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'https://orangopag.herokuapp.com/index.php/api/Transacoes';
  var config = {headers:  {
        'Content-Type': 'application/json'}
  };
  var cnpj = '90146311000156';
  var apiKey = 'f439fa7c6f9659dbe29e872b46bb102d';

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
      var deferred = $q.defer();
      boleto.api_key = apiKey;
      boleto.cnpj_loja = cnpj;
      boleto.format = 'json';
      boleto.tipo_trans = 1;
      console.log(boleto);

      $http({
        method:'POST',
        url: url,
        data: boleto,
        headers: {'Content-Type': 'application/json'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        }
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
    // codigo_verificacao
    // tipo_cartao
    // n_parcelas
    // valor_parcela
    function postCartaoCredito(cartaoCredito){
      cartaoCredito.api_key = apiKey;
      cartaoCredito.cnpj_loja = cnpj;
      cartaoCredito.format = 'json';
      cartaoCredito.tipo_trans = 2;
      cartaoCredito.tipo_cartao = 'Credito';
      cartaoCredito.n_parcelas = 1;
      cartaoCredito.valor_parcela = cartaoCredito.valor_total;
      console.log(cartaoCredito);
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url,
        data: cartaoCredito,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        }
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
      cartaoDebito.api_key = apiKey;
      cartaoDebito.cnpj_loja = cnpj;
      cartaoDebito.format = 'json';
      cartaoCredito.tipo_trans = 3;
      cartaoCredito.tipo_cartao = 'Debito';
      console.log(cartaoDebito);
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url,
        data: cartaoDebito,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        }
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
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        }
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
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        }
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
