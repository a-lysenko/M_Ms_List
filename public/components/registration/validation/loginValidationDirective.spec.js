describe('LoginValidationDirective', function () {
    var $compile, $scope, $rootScope,
        RegistrationService,
        userData, dirElement, userLogin;

    beforeEach(function () {
        module('modalRegister');
        module('registration');

        userData = {
            name: 'name'
        };
        userLogin = 'user login';

    });

    beforeEach(inject(function (_$compile_, _$rootScope_, _RegistrationService_) {

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        RegistrationService = _RegistrationService_;
        spyOn(RegistrationService, 'getUser').andReturn(userData);

        // compile here
        dirElement = angular.element('<input ng-unique-login ng-model="userLogin" name="login" />');
        $scope.userLogin = userLogin;
        $compile(dirElement)($scope);
        $scope.$digest();
    }));

    it('will return if user with such login is or not', function () {
        expect(RegistrationService.getUser).toHaveBeenCalledWith(userLogin);
    });
});