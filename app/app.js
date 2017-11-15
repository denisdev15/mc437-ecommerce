var app = angular.module('app', ['ngRoute']);

app.config( ['$routeProvider', function($routeProvider)
{
  $routeProvider

  .when('/home', {
    templateUrl: 'app/views/homepage.html',
    controller: 'HomepageCtrl'
  })
  .when('/product/:productId', {
    templateUrl: 'app/views/product.html',
    controller: 'ProductCtrl'
  })
  .when('/search/:query', {
    templateUrl: 'app/views/search.html',
    controller: 'SearchCtrl'
  })

  // caso não seja nenhum desses, redirecione para a rota '/'
  .otherwise ({ redirectTo: '/home' });

}]);
