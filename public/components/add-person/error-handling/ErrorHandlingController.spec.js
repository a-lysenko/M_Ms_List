describe('ErrorHandlingController', function () {
    var $controller, $scope, sut, $rootScope, ErrorHandlingService, toaster,
        errorDescription, errorDescOnInvalidName;

    beforeEach(function () {
        module('addPerson');

        errorDescription = 'error description';
        errorDescOnInvalidName = 'Name value is not valid';
    });

    beforeEach(inject(function (_$controller_, _$rootScope_, _ErrorHandlingService_, _toaster_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;

        $scope = $rootScope.$new();
        spyOn($rootScope, '$on').andCallThrough();

        ErrorHandlingService = _ErrorHandlingService_;
        spyOn(ErrorHandlingService, 'getErrorsDescription').andCallThrough();

        toaster = _toaster_;
        spyOn(toaster, 'error');

        executeController();
    }));

    function executeController() {
        sut = $controller('ErrorHandlingController', {
            $scope: $scope,
            ErrorHandlingService: ErrorHandlingService,
            toaster: toaster
        });
    }

    describe('Show errors description', function () {
        beforeEach(function () {
            ErrorHandlingService.updateErrorState({
                nameIsValid: false
            });
            executeController();
            $scope.$emit('updated-error-state', [errorDescription]);
        });
        it('will update collection of errors description', function () {
            expect(ErrorHandlingService.getErrorsDescription).toHaveBeenCalled();
            expect($scope.errorsDescription.indexOf(errorDescription)).not.toBe(-1);
        });

        it('will handle error states', function () {
            expect(toaster.error).toHaveBeenCalledWith('',errorDescOnInvalidName );
        });

        it('will handle broadcasted error descriptions', function () {
            expect(toaster.error).toHaveBeenCalledWith('', errorDescription);
        });
    });
});