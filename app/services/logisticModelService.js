(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'site-env.mxvnckfmbb.us-east-2.elasticbeanstalk.com/api/';
  var id_site = 5;
  var config = {headers:  {
        'Content-Type': 'application/json'}
  };

  app
  .factory('LogisticModelService', LogisticModelService);

  LogisticModelService.$inject = ['$http', '$log', '$q'];
  function LogisticModelService($http, $log, $q) {
    var service = {};


    service.createNewSite = createNewSite;
    service.addNewAddressSite = addNewAddressSite;
    service.consultaPrazoPreco = consultaPrazoPreco;
    service.consultaPrazoPrecoSiteNaoCadast = consultaPrazoPrecoSiteNaoCadast;
    service.postarProduto = postarProduto;
    service.cancelaPostagem = cancelaPostagem;
    service.atualizaStatusPostagem = atualizaStatusPostagem;
    service.getDadosPostagem = getDadosPostagem;
    service.getStatusPostagem = getStatusPostagem;

    return service;

    // Objeto cadastro tudo como string contendo os parametros nome e email
    // A função retorna o id do novo site cadastrado.
    function createNewSite(cadastro){
      var deferred = $q.defer();
      $http({
        method:'POST',
        url: url + 'site',
        data: cadastro,
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

// * -> campos obrigatórios
// address -> passar objeto com: *cep (int[8]), *numero (int[11]), *estado (string[2]),
// *cidade (string) e *endereco (string)
      function addNewAddressSite(address){
        var deferred = $q.defer();
        $http({
          method:'POST',
          url: url + '​site/5/endereco',
          data: adress,
          headers: {'Content-Type': 'application/json'
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

// objeto logistica -> id_site (integer - nosso site é o 5), destino_cep (int[8]), destino_numero (int(11)),
// destino_estado (string[2]), destino_cidade (string), destino_endereco (string), volume (int)
// a função retorna um objeto com: preco, tempo e message.
    function consultaPrazoPreco(logistica){
      var deferred = $q.defer();
      logistica.id_site = id_site;
      $http({
        method:'GET',
        url: url + 'consulta',
        data: logistica,
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

  // objeto logistica -> partida_cep (int[8]), partida_numero (int(11)), partida_estado (string[2]),
  // partida_cidade (stringS), destino_cep (int[8]), destino_numero (int(11)),
  // destino_estado (string[2]), destino_cidade (string), destino_endereco (string), volume (int)
  // a função retorna um objeto com: preco, tempo e message.
      function consultaPrazoPrecoSiteNaoCadast(logisitca){
        var deferred = $q.defer();
        $http({
          method:'GET',
          url: url + 'consulta',
          data: logistica,
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


// pacote -> objeto contendo dados para postar:
// id_site: 5, destinatario (nome do destinarãrio), destino_cep,
// destino_numero, destino_estado, destino cidade, destino_endereco e volume (int)
// A função id (id da postagem), preco e message.
  function postarProduto(pacote){
    var deferred = $q.defer();
    pacote.id_site = 5;
    $http({
      method:'POST',
      url: url + '​envio',
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

// id_envio -> número que corresponde ao ID gerado ao enviar o pacote
// A função retorna:
//      "message":​ ​ "Status​ ​ foi​ ​ alterado​ ​ com​ ​ sucesso",
//      ​"status":​ ​ "A​ ​ entrega​ ​ do​ ​ pacote​ ​ foi​ ​ cancelada" .
  function cancelaPostagem(id_envio){
    var deferred = $q.defer();
    $http({
      method:'PUT',
      url: url + 'envio/'+id_envio+'/cancela',
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


// id_envio -> número que corresponde ao ID gerado ao enviar o pacote
// A função retorna:
//      "message":​ ​ "Status​ ​ foi​ ​ alterado​ ​ com​ ​ sucesso",
//      ​"status":​ ​ "O​ ​ pacote​ ​ saiu​ ​ para​ ​ entrega​ ​ ao​ ​ destinatário" .
// Há​ 4 status​ ​ para​ ​ entregas:​ ​ objeto​ ​ postado,​ ​ objeto​ ​ saiu​ ​ para​ ​ entrega​ ​ ao​ ​ destinatário,
// objeto​ ​ entregue​ ​ e objeto​ ​ cancelado.
  function atualizaStatusPostagem(id_envio){
    var deferred = $q.defer();
    $http({
      method:'PUT',
      url: url + 'envio/'+id_envio+'/update',
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

// id_envio -> número que corresponde ao ID gerado ao enviar o pacote
// A função retorna todos os dados referentes a postagem com o id passado.

  function getDadosPostagem(id_envio){
    var deferred = $q.defer();
    $http({
      method:'GET',
      url: url + 'envio/'+id_envio,
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


// id_envio -> número que corresponde ao ID gerado ao enviar o pacote
// A função retorna o status referentes a postagem com o id passado.

  function getStatusPostagem(id_envio){
    var deferred = $q.defer();
    $http({
      method:'GET',
      url: url + 'envio/'+id_envio+'/status',
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
