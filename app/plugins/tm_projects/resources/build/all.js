'use strict';

// the module should depend on 'core' to use the stock services & components
angular.module('tm.projects', ['core']);


'use strict';

angular.module('tm.projects').config(function ($routeProvider) {
    $routeProvider.when('/view/tm/projects', {
        templateUrl: '/tm_projects:resources/partial/index.html',
        controller: 'TMProjectIndexController'
    });
});


'use strict';

angular.module('tm.projects').controller('TMProjectIndexController', function ($scope, $http, $uibModal, pageTitle, gettext, notify, messagebox) {
    $scope.title = gettext('Projects');
    pageTitle.set($scope.title);

    $scope.projectToLoad = null;

    $scope.start = function () {
        if ($scope.projectToLoad == null) {
            $scope.loadProjects();
        }
    };

    $scope.loadProjects = function () {
        $http.get('/api/tm/projects/list').then(function (resp) {
            $scope.project_list = resp.data;
        });
    };

    $scope.loadProject = function (id) {
        $http.post('/api/tm/projects/get', { "project_id": id }).then(function (resp) {
            $scope.project = resp.data[0];
            $scope.loadHosts(id);
        });
    };

    $scope.createProject = function () {
        $uibModal.open({
            templateUrl: '/tm_projects:resources/partial/addproject.modal.html',
            controller: 'TMAddProjectModalController',
            resolve: { user: $scope.user }
        }).result.then(function (project) {
            $http.post('/api/tm/projects/create', { "project_name": project.name, "project_description": project.description, "project_permission": project.permission, "project_author": project.author, "project_global_username": project.global_username, "project_global_password": project.global_password, "project_global_sshkey": project.global_sshkey }).then(function (resp) {
                if (resp.data.status == "success") {
                    notify.success("Saved!");
                }
                $scope.loadProjects();
            });
        });
    };

    $scope.deleteProject = function (id) {
        messagebox.show({
            text: "Delete this project?",
            positive: 'Delete',
            negative: 'Cancel'
        }).then(function () {
            $http.post('/api/tm/projects/delete', { "project_id": id }).then(function (resp) {
                if (resp.data.status == "success") {
                    notify.success("Deleted!");
                }
                $scope.loadProjects();
            });
        });
    };

    $scope.openProject = function (id) {
        $scope.projectToLoad = id;
        $scope.loadProject(id);
    };

    $scope.loadHosts = function (id) {
        $http.post('/api/tm/hosts/list', { "project_id": id }).then(function (resp) {
            $scope.host_list = resp.data;
            angular.forEach($scope.host_list, function (value, key) {
                $scope.host_list[key].checkbox = false;
            });
        });
    };

    $scope.createHost = function () {
        $uibModal.open({
            templateUrl: '/tm_projects:resources/partial/addhost.modal.html',
            controller: 'TMAddHostModalController',
            resolve: { user: $scope.user, project: $scope.project, hostlist: function hostlist() {
                    return $scope.host_list;
                } }
        }).result.then(function (host) {
            $http.post('/api/tm/hosts/create', { "host_name": host.name, "host_address": host.address, "host_description": host.description, "host_author": host.author, "host_project": host.project, "host_username": host.username, "host_password": host.password, "host_sshkey": host.sshkey, "host_hophost": host.hophost }).then(function (resp) {
                if (resp.data.status == "success") {
                    notify.success("Saved!");
                }
                $scope.loadHosts($scope.projectToLoad);
            });
        });
    };

    $scope.selectAllHosts = function () {
        if ($scope.hostCheckboxStatus) {
            angular.forEach($scope.host_list, function (value, key) {
                $scope.host_list[key].checkbox = true;
            });
        } else {
            angular.forEach($scope.host_list, function (value, key) {
                $scope.host_list[key].checkbox = false;
            });
        }
    };

    $scope.$watch('identity.user', function () {
        if ($scope.identity.user == undefined) {
            return;
        }
        if ($scope.identity.user == null) {
            return;
        }

        $scope.user = $scope.identity.profile;
        $scope.start();
    });
});


'use strict';

angular.module('tm.projects').controller('TMAddProjectModalController', function ($scope, $uibModalInstance, $http, user) {

    $scope.save = function () {
        $scope.project.author = user.id;
        $uibModalInstance.close($scope.project);
    };

    $scope.close = function () {
        $uibModalInstance.dismiss();
    };
});

angular.module('tm.projects').controller('TMAddHostModalController', function ($scope, $uibModalInstance, $http, user, project, hostlist) {

    $scope.project_name = project.name;
    $scope.host_list = hostlist;

    $scope.save = function () {
        $scope.host.author = user.id;
        $scope.host.project = project.id;
        $uibModalInstance.close($scope.host);
    };

    $scope.close = function () {
        $uibModalInstance.dismiss();
    };
});


