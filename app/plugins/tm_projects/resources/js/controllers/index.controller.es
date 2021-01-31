angular.module('tm.projects').controller('Tm_projectsIndexController', function($scope, $http, pageTitle, gettext, notify) {
    $scope.title = gettext('Projects');
    pageTitle.set($scope.title);



});
