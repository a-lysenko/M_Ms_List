(function () {
    'use strict';

    angular
        .module('voting')
        .factory('VotingService', VotingService);

    function VotingService() {
        var _defaultValue = 0;
        var _votes = {};

        return {
            getVote: getVote,
            setVote: setVote
        };

        function getVote(id) {
            return _votes[id];
        }

        function setVote(id, voteValue) {
            _votes[id] = voteValue || _defaultValue;
        }
    }
})();