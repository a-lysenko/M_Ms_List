(function () {
    angular.module('Mentors').directive('mentorsList', mentorsList);

    function mentorsList() {
        return {
            restrict: 'E',
            templateUrl: 'components/person-list/personList.html',
            scope: {
                persons: '=mentors'
            },

            controller: function () {
                angular.extend(this, {
                    mExtraHeader: "Q-ty mentees",
                    personListTitle: 'Mentors list:',
                    mLinkGroup: 'mentors',
                    personObjType:"mentor",

                    mExtraValue: mExtraValue
                });

                function mExtraValue(mentor) {
                    return mentor.mentees.length;
                }
            },
            controllerAs: 'personList',
            bindToController: true

        }
    }
})();