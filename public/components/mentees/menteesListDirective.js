angular.module('Mentees').directive('menteesList', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/person-list/personList.html',
        scope: {
            persons: '=mentees',
            mentors: '='
        },

        controller: function (MenteesService) {
            var vm = this;

            angular.extend(this, {
                mExtraHeader: "Mentee's mentor",
                personListTitle: 'Mentees list:',
                mLinkGroup: 'mentees',
                personObjType:"mentee",

                menteeMentorLink: MenteesService.getMenteeMentorLink(vm.persons, vm.mentors),
                mExtraValue: mExtraValue
            });

            function mExtraValue(mentee) {
                return vm.menteeMentorLink[mentee._id].desc;
            }

        },
        controllerAs: 'personList',
        bindToController: true
    }
});