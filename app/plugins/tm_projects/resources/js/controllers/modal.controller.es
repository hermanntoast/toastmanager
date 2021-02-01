angular.module('tm.projects').controller('TMAddProjectModalController', function($scope, $uibModalInstance, $http, user) {

    $scope.save = () => {
        $scope.project.author = user.id;
        $uibModalInstance.close($scope.project);
    }

    $scope.close = () => {
        $uibModalInstance.dismiss()
    }

});

angular.module('tm.projects').controller('TMAddHostModalController', function($scope, $uibModalInstance, $http, user, project, hostlist) {

    $scope.project_name = project.name;
    $scope.host_list = hostlist;

    $scope.save = () => {
        $scope.host.author = user.id;
        $scope.host.project = project.id
        $uibModalInstance.close($scope.host);
    }

    $scope.close = () => {
        $uibModalInstance.dismiss()
    }

});
