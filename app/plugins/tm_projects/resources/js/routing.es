angular.module('tm.projects').config(($routeProvider) => {
    $routeProvider.when('/view/tm/projects', {
        templateUrl: '/tm_projects:resources/partial/index.html',
        controller: 'TMProjectIndexController',
    });
});
