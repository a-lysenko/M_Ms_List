describe('ModalInstanceRegisterController', function() {
    var $controller, sut,
        mock$modalInstance, EMAIL_VALIDATION_PATTERN, mockForm, regData;

    beforeEach(function () {
        module('sampleApp');
        module('modalRegister');

        mockForm = {
            $setSubmitted: jasmine.createSpy('$setSubmitted'),
            $valid: true
        };

        mock$modalInstance = {
            close: jasmine.createSpy('close'),
            dismiss: jasmine.createSpy('dismiss')
        };

        regData = {
            login: 'login'
        }
    });

    beforeEach(inject(function(_$controller_, EMAIL_VALIDATION_PATTERN){
        $controller = _$controller_;

        EMAIL_VALIDATION_PATTERN = EMAIL_VALIDATION_PATTERN;

        executeController();
    }));

    function executeController() {
        sut = $controller('ModalInstanceRegisterController', {
            $modalInstance: mock$modalInstance,
            EMAIL_VALIDATION_PATTERN: EMAIL_VALIDATION_PATTERN
        });
        sut.regData = regData;
    }

    describe('Ok (register)', function() {
        it('will set form submitted', function () {
            sut.ok(mockForm);
            expect(mockForm.$setSubmitted).toHaveBeenCalled();
        });

        it('will close valid form', function () {
            sut.ok(mockForm);
            expect(mock$modalInstance.close).toHaveBeenCalledWith(regData);
        });

        it('will NOT close INvalid form', function () {
            mockForm.$valid = false;
            sut.ok(mockForm);
            expect(mock$modalInstance.close).not.toHaveBeenCalled();
        });
    });

    describe('Cancel (register)', function() {
        it('will dismiss form', function () {
            sut.cancel();
            expect(mock$modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });
    });
});