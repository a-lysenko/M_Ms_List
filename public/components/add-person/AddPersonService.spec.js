describe('AddPersonService', function () {
    var sut, $rootScope, $modal, $log, scope, mockModal,
        defferedModalInstanceResult, $q, DataSyncService,
        mockPersonType, mockPersonData;

    beforeEach(function () {
        module('modalAddPerson');
        module('ngRoute');
        module('dataSync');

        module("addPerson");
        mockPersonType = 'mockPersonType';
        mockPersonData = 'mockPersonData';
    });

    beforeEach(inject(function (AddPersonService, _$rootScope_, _$modal_, _$log_, _$q_, _DataSyncService_) {
        sut = AddPersonService;

        $rootScope = _$rootScope_;
        $modal = _$modal_;
        $log = _$log_;
        $q = _$q_;

        DataSyncService = _DataSyncService_;
        scope = $rootScope.$new();

        spyOn($rootScope, '$new').andCallThrough();
        spyOn($log, 'info');
        spyOn(DataSyncService, 'addPerson');
    }));

    beforeEach(function () {
        defferedModalInstanceResult = $q.defer();
        mockModal = {
            result: defferedModalInstanceResult.promise
        };

        spyOn($modal, 'open').andReturn(mockModal);
    });

    describe('Show modal to add person', function () {
        beforeEach(function () {
            sut.showModalToAddPerson(mockPersonType);
        });

        it('will create and open modal instance', function () {
            expect($modal.open).toHaveBeenCalledWith({
                animation: true,
                templateUrl: 'components/add-person/modal/modalInstance.html',
                controller: 'ModalInstanceController',
                scope: jasmine.any(Object)
            });
        });

        it('will add a person to database on success action on modal instance', function () {
            defferedModalInstanceResult.resolve(mockPersonData);
            $rootScope.$apply();

            expect(DataSyncService.addPerson).toHaveBeenCalledWith(mockPersonType, mockPersonData)
        });

        it('will log on error event on modal instance', function () {
            var loremIpsum = 'lorem ipsum';
            defferedModalInstanceResult.reject(loremIpsum);
            $rootScope.$apply();

            expect($log.info).toHaveBeenCalledWith('Modal dismissed reason: ', loremIpsum)
        })
    });
});