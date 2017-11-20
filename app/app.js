var app = angular.module('app', ['ngRoute', 'ngCookies']);

// Removido para conseguir fazer o app funcionar
//var app = angular.module('app', ['ngRoute', 'ui.utils.masks']);

app.config( ['$routeProvider', function($routeProvider)
{

  $routeProvider

  .when('/home', {
    templateUrl: 'app/views/homepage.html',
    controller: 'HomepageCtrl'
  })
  .when('/login', {
    templateUrl: 'app/views/login.html',
    controller: 'LoginCtrl'
  })
  .when('/profile', {
    templateUrl: 'app/views/profile.html',
    controller: 'ProfileCtrl'
  })
  .when('/register', {
    templateUrl : '/app/views/register.html',
    controller  : 'RegisterCtrl',
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

}])
.run(['$rootScope', '$location', '$cookies', '$http', function($rootScope, $location, $cookies, $http) {

  // keep user logged in after page refresh
  $rootScope.globals = $cookies.getObject('globals') || {};
  // if ($rootScope.globals.currentUser) {
  //   $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
  // }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // redirect to login page if not logged in and trying to access a restricted page
    // var locationPath = $location.path();
    // // TODO regex
    // var restrictedPage = ['/home', '/product', '/search'].indexOf(locationPath) === -1;
    // var loggedIn = $rootScope.globals.currentUser;
    // if (restrictedPage && !loggedIn) {
    //   $location.path('/login');
    // }
  });
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
