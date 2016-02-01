describe('RegistrationService', function () {
    var sut, $rootScope,
        $modal, $log, scope, mockModal,
        defferedModalInstanceResult, $q, DataSyncService,
        mockPersonData,
        user, userLogin, userData;

    beforeEach(function () {
        module('modalRegister');
        module('ngRoute');
        module('registration');

        userLogin = 'UserLogin';
        userData = {
            name: 'User"s name',
            email: 'users@a.com'
        };
        user = {
            login: userLogin,
            name: userData.name,
            email: userData.email
        };
    });

    beforeEach(inject(function (RegistrationService, _$rootScope_, _$q_, _$modal_, _$log_) {
        sut = RegistrationService;

        $rootScope = _$rootScope_;

        scope = $rootScope.$new();
        spyOn($rootScope, '$new').andCallThrough();

        $q = _$q_;

        $modal = _$modal_;
        $log = _$log_;
        spyOn($log, 'info');
    }));

    beforeEach(function () {
        defferedModalInstanceResult = $q.defer();
        mockModal = {
            result: defferedModalInstanceResult.promise
        };

        spyOn($modal, 'open').andReturn(mockModal);
    });

    describe('Add / Get user', function () {
        beforeEach(function () {
            sut.addUser(user);
        });

        it('will store user', function () {
            expect(sut.getUser(userLogin)).toEqual(userData);
        });
    });

    describe('Show modal to register user', function () {
        beforeEach(function () {
            sut.showModalToRegister();
        });

        it('will create and open modal instance', function () {
            expect($modal.open).toHaveBeenCalledWith({
                animation: true,
                templateUrl: 'components/registration/modal/modalInstance.html',
                controller: 'ModalInstanceRegisterController',
                controllerAs: 'registration'
            });
        });

        it('will register user on success action on modal instance', function () {
            defferedModalInstanceResult.resolve(user);
            $rootScope.$apply();

            expect(sut.getUser(userLogin)).toEqual(userData);
        });

        it('will log on error event on modal instance', function () {
            var loremIpsum = 'lorem ipsum';
            defferedModalInstanceResult.reject(loremIpsum);
            $rootScope.$apply();

            expect($log.info).toHaveBeenCalledWith('Modal dismissed reason: ', loremIpsum)
        })
    });
});