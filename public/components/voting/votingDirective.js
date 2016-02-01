(function () {
    'use strict';

    angular
        .module('voting')
        .directive('voting', voting);

    function voting() {
        return {
            restrict: 'E',
            scope: {
                personId: '@'
            },
            replace: true,
            transclude: true,

            templateUrl: 'components/voting/voting.html',
            controller: function (VotingService) {
                var vm = this;
                angular.extend(vm, {
                    votes: VotingService.getVote(vm.personId) || 0,
                    voteUp: voteUp,
                    voteDown: voteDown
                });

                function voteUp() {
                    changeVotes(1);
                }

                function voteDown() {
                    changeVotes(-1);
                }

                function changeVotes(step) {
                    vm.votes+=step;
                    VotingService.setVote(vm.personId, vm.votes);
                }
            },
            controllerAs: 'votingCtrl',
            bindToController: true
        }
    }
})();