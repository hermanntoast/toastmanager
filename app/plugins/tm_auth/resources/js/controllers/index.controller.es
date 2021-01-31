angular.module('tm.auth').controller('Tm_authIndexController', function($scope, $http, pageTitle, gettext, notify) {
    pageTitle.set(gettext('Tm_auth'));
});
