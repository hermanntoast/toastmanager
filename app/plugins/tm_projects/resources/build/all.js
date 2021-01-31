'use strict';

// the module should depend on 'core' to use the stock services & components
angular.module('tm.projects', ['core']);


'use strict';

angular.module('tm.projects').config(function ($routeProvider) {
    $routeProvider.when('/view/tm/projects', {
        templateUrl: '/tm_projects:resources/partial/index.html',
        controller: 'Tm_projectsIndexController'
    });
});


'use strict';

angular.module('tm.projects').controller('Tm_projectsIndexController', function ($scope, $http, pageTitle, gettext, notify) {
    $scope.title = gettext('Projects');
    pageTitle.set($scope.title);
});


