angular.module("registration").directive("ngUniqueLogin", function ($q, $timeout, RegistrationService) {
    return {
        restrict: "A",
        scope: {},
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$validators.notUnique = function (modelValue, viewValue) {
                return RegistrationService.getUser(modelValue) === undefined;
            };

        }
    }
});
