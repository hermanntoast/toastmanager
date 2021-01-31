'use strict';

// the module should depend on 'core' to use the stock services & components
angular.module('tm.auth', ['core']);


'use strict';

angular.module('tm.auth').config(function ($routeProvider) {
    $routeProvider.when('/view/tm/auth', {
        templateUrl: '/tm_auth:resources/partial/index.html',
        controller: 'Tm_authIndexController'
    });
});


'use strict';

angular.module('tm.auth').controller('Tm_authIndexController', function ($scope, $http, pageTitle, gettext, notify) {
    pageTitle.set(gettext('Tm_auth'));
});


