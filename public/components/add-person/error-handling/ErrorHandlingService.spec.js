describe('ErrorHandlingService', function () {
    var sut, errorState, descriptionOfInvalidName, descriptionOfInvalidSurname;

    beforeEach(function () {
        module("addPerson");

        descriptionOfInvalidName = 'Name value is not valid';
        descriptionOfInvalidSurname = 'Surname value is not valid';
        errorState = {};
    });

    beforeEach(inject(function (ErrorHandlingService) {
        sut = ErrorHandlingService;

        spyOn(ErrorHandlingService, 'updateErrorState').andCallThrough();
        spyOn(ErrorHandlingService, 'getErrorState').andCallThrough();
        spyOn(ErrorHandlingService, 'getErrorsDescription').andCallThrough();
    }));

    describe('Update error state / Get error state', function () {

        it('will save given value and return it', function () {
            errorState = {isValid: 'is valid'};
            sut.updateErrorState(errorState);

            expect(sut.getErrorState()).toBe(errorState);
        })
    });

    describe('Get errors description', function () {

        beforeEach(function () {
            errorState = {};
            sut.updateErrorState(errorState);
        });

        it('will add specific description for state with invalid name', function () {
            errorState.nameIsValid = false;
            var errorDescription = sut.getErrorsDescription();
            expect(errorDescription.indexOf(descriptionOfInvalidName)).not.toBe(-1);
        });

        it('will NOT add description for state of invalid name if it is not', function () {
            errorState.nameIsValid = true;
            var errorDescription = sut.getErrorsDescription();
            expect(errorDescription.indexOf(descriptionOfInvalidName)).toBe(-1);
        });

        it('will add specific description for state with invalid surname', function () {
            errorState.surnameIsValid = false;
            var errorDescription = sut.getErrorsDescription();
            expect(errorDescription.indexOf(descriptionOfInvalidSurname)).not.toBe(-1);
        });

        it('will NOT add description for state of invalid surname if it is not', function () {
            errorState.surnameIsValid = true;
            var errorDescription = sut.getErrorsDescription();
            expect(errorDescription.indexOf(descriptionOfInvalidSurname)).toBe(-1);
        });
    });
});