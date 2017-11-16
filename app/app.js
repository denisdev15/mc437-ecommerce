var app = angular.module('app', ['ngRoute']);

// Removido para conseguir fazer o app funcionar
//var app = angular.module('app', ['ngRoute', 'ui.utils.masks']);

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
  .when('/cart', {
    templateUrl: 'app/views/cart.html',
    controller: 'CartCtrl'
  })
  .when('/checkout', {
    templateUrl: 'app/views/checkout.html',
    controller: 'CheckoutCtrl'
  })

  // caso não seja nenhum desses, redirecione para a rota '/'
  .otherwise ({ redirectTo: '/home' });

}]);


app.run(['$rootScope', function($rootScope){
  $rootScope.cart = [];  
  $rootScope.cep = "";  
}])

app.filter('roundTo', function(numberFilter) {
  return function(value, maxDecimals) {
    return numberFilter((value || 0)
      .toFixed(maxDecimals)
      .replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")
    );
  }
})
