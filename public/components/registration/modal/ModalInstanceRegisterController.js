(function () {
    'use strict';

    angular
        .module('modalRegister')
        .controller('ModalInstanceRegisterController', ModalInstanceRegisterController);

    function ModalInstanceRegisterController($modalInstance, EMAIL_VALIDATION_PATTERN) {
        var vm = this;
        angular.extend(this, {
            regData: {},
            emailValidationPattern: EMAIL_VALIDATION_PATTERN,

            ok: ok,
            cancel: cancel
        });

        function ok(form) {
            form.$setSubmitted();

            if (form.$valid) {
                $modalInstance.close(vm.regData);
            }
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }
})();
