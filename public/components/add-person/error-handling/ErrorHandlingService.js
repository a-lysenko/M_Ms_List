(function () {
    'use strict';

    angular
        .module('addPerson')
        .factory('ErrorHandlingService', ErrorHandlingService);

    function ErrorHandlingService() {
        var _errorState = {};

        return {
            updateErrorState: updateErrorState,
            getErrorState: getErrorState,
            getErrorsDescription: getErrorsDescription
        };

        function updateErrorState(errorState) {
            _errorState = errorState;
        }

        function getErrorState() {
            return _errorState;
        }

        function getErrorsDescription() {
            var errorsDescription = [];

            if (_errorState.nameIsValid === false) {
                errorsDescription.push('Name value is not valid');
            }
            if (_errorState.surnameIsValid === false) {
                errorsDescription.push('Surname value is not valid');
            }

            return errorsDescription;
        }
    }
})();