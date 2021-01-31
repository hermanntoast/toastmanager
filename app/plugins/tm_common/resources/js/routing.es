angular.module('tm.common').config(($routeProvider) => {
    $routeProvider.when('/view/tm/common', {
        templateUrl: '/tm_common:resources/partial/index.html',
        controller: 'Tm_commonIndexController',
    });
});
