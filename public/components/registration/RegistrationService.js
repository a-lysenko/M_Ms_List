(function () {
    'use strict';

    angular
        .module('registration')
        .factory('RegistrationService', RegistrationService);

    function RegistrationService($modal,  $log) {
        var _registeredUsers = {};
        return {
            addUser: addUser,
            getUser: getUser,

            showModalToRegister: showModalToRegister
        };

        function addUser(user) {
            _registeredUsers[user.login] = {
                name: user.name,
                email: user.email
            }
        }

        function getUser(login) {
            return _registeredUsers[login];
        }

        function showModalToRegister() {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'components/registration/modal/modalInstance.html',
                controller: 'ModalInstanceRegisterController',
                controllerAs: 'registration'
            });

            modalInstance.result
                .then(function (regData) {
                    addUser(regData);
                }, function (text) {
                    $log.info('Modal dismissed reason: ', text);
                });
        }
    }
})();