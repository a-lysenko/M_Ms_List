describe('VotingService', function () {
    var sut, id, voteValue;

    beforeEach(function () {
        module('voting');

        id = 'id';
        voteValue = 'vote value';
    });

    beforeEach(inject(function (VotingService) {
        sut = VotingService;

    }));

    describe('Get / Set votes', function () {
        it('will store and return stored vote by id', function () {
            sut.setVote(id, voteValue);
            expect(sut.getVote(id)).toEqual(voteValue);
        });

        it('will exchange empty value up to default while storing', function () {
            sut.setVote(id, undefined);
            expect(sut.getVote(id)).toBe(0);
        });
    });
});