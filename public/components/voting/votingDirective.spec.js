describe('VotingDirective', function () {
    var sut, $rootScope, $log, scope, VotingService;

    beforeEach(function () {
        module('voting');
    });

    beforeEach(inject(function (voting, _VotingService_) {
        sut = voting;

        console.log('VotingService', sut);

        VotingService = _VotingService_;
    }));

    beforeEach(function () {

    });

    it('will have personId on scope', function () {
        expect(sut.scope.personId).toBe(12);
    });


});