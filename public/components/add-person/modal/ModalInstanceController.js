(function () {
    'use strict';

    angular
        .module('modalAddPerson')
        .controller('ModalInstanceController', ModalInstanceController);

    function ModalInstanceController($scope, $rootScope, $modalInstance,
                                     DataSyncService, ErrorHandlingService) {
        // Please note that $modalInstance represents a modal window (instance) dependency.
        // It is not the same as the $modal service used above.
        angular.extend($scope, {
            personData: {},

            ok: ok,
            cancel: cancel
        });

        function ok() {
            var personData = $scope.personData;

            DataSyncService.validatePersonData(personData)
                .then(function (personData) {
                    $modalInstance.close(personData);
                })
                .catch(function (errorState) {
                    ErrorHandlingService.updateErrorState(errorState);
                    $rootScope.$broadcast('updated-error-state');
                });
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }
})();