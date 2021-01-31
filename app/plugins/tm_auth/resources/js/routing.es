angular.module('tm.auth').config(($routeProvider) => {
    $routeProvider.when('/view/tm/auth', {
        templateUrl: '/tm_auth:resources/partial/index.html',
        controller: 'Tm_authIndexController',
    });
});
