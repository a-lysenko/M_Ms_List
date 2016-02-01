(function () {
    'use strict';

    angular
        .module('sampleApp')
        .controller('PageHeaderController', PageHeaderController);

    function PageHeaderController(AddPersonService, RegistrationService) {
        angular.extend(this, {
            showModalToAddPerson: AddPersonService.showModalToAddPerson,
            showModalToRegister: RegistrationService.showModalToRegister
        });
    }
})();

