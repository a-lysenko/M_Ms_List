(function () {
    'use strict';

    angular
        .module('addPerson')
        .factory('AddPersonService', AddPersonService);

    function AddPersonService($modal,  $log, $rootScope, DataSyncService) {
        return {
            showModalToAddPerson: showModalToAddPerson
        };

        function showModalToAddPerson(personType) {
            var scope = $rootScope.$new();
            angular.extend(scope, {
                personType: personType
            });

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'components/add-person/modal/modalInstance.html',
                controller: 'ModalInstanceController',
                scope: scope
            });

            modalInstance.result
                .then(function (personData) {
                    DataSyncService.addPerson(personType, personData);
                }, function (text) {
                    $log.info('Modal dismissed reason: ', text);
                });
        }
    }
})();