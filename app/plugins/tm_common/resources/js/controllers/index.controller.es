angular.module('tm.common').run(function(customization) {
     customization.plugins.core.title = 'ToastManager'
});

angular.module('tm.common').controller('Tm_commonIndexController', function($scope, $http, pageTitle, gettext, notify) {
    pageTitle.set(gettext('Tm_common'));
});
