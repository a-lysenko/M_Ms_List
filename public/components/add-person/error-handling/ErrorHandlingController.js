(function () {
    'use strict';

    angular
        .module('addPerson')
        .controller('ErrorHandlingController', ErrorHandlingController);

    function ErrorHandlingController($scope, $rootScope, ErrorHandlingService, toaster) {
        angular.extend($scope, {
            errorsDescription: []
        });

        function updateErrorsDescription(event, errorsDescription) {
            $scope.errorsDescription = ErrorHandlingService.getErrorsDescription();
            if (Array.isArray(errorsDescription)) {
                $scope.errorsDescription = $scope.errorsDescription.concat(errorsDescription);
            }
            showErrors();
        }

        function showErrors() {
            $scope.errorsDescription.forEach(function (errorDescription) {
                toaster.error("", errorDescription);
            });
        }

        $rootScope.$on('updated-error-state', updateErrorsDescription);
    }
})();