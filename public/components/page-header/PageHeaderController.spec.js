describe('PageHeaderController', function() {
    var $controller, sut,
        AddPersonService, RegistrationService;

    beforeEach(function () {
        module('sampleApp');
    });

    beforeEach(inject(function(_$controller_, _AddPersonService_, _RegistrationService_){
        $controller = _$controller_;

        AddPersonService = _AddPersonService_;
        spyOn(AddPersonService, 'showModalToAddPerson');

        RegistrationService = _RegistrationService_;
        spyOn(RegistrationService, 'showModalToRegister');

        executeController();
    }));

    function executeController() {
        sut = $controller('PageHeaderController', {
            AddPersonService: AddPersonService,
            RegistrationService: RegistrationService
        });
    }

    describe('Show modal window to add person', function() {
        it('will show it', function () {
            var personType = 'personType';
            sut.showModalToAddPerson(personType);
            expect(AddPersonService.showModalToAddPerson).toHaveBeenCalledWith(personType);
        });
    });

    describe('Show modal window to register', function() {
        it('will show it', function () {
            sut.showModalToRegister();
            expect(RegistrationService.showModalToRegister).toHaveBeenCalled();
        });
    });
});