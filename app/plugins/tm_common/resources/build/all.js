'use strict';

// the module should depend on 'core' to use the stock services & components
angular.module('tm.common', ['core']);


'use strict';

angular.module('tm.common').config(function ($routeProvider) {
    $routeProvider.when('/view/tm/common', {
        templateUrl: '/tm_common:resources/partial/index.html',
        controller: 'Tm_commonIndexController'
    });
});


'use strict';

angular.module('tm.common').run(function (customization) {
    customization.plugins.core.title = 'ToastManager';
});

angular.module('tm.common').controller('Tm_commonIndexController', function ($scope, $http, pageTitle, gettext, notify) {
    pageTitle.set(gettext('Tm_common'));
});


