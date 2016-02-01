(function () {
    angular
        .module('Mentee')
        .controller('MenteeController', MenteeController);

    function MenteeController($scope, MenteeService, MenteesService, mentee, mentors) {
        angular.extend($scope, {
            mentors: mentors,
            mentee: mentee,

            initialMentorId: MenteesService.getMentorDescByMenteeId(mentee._id, mentors).id,
            mentorsDesc: MenteesService.getMentorsDesc(mentors),

            updateMentorOfMentee: MenteeService.updateMentorOfMentee
        });

        activate();

        function activate() {
            MenteeService.setCurrentMentorId($scope.initialMentorId);
        }

        $scope.$on('update-mentors', function () {
            console.log('update-mentors');
        });
        $scope.$on('$routeChangeError', function (p1, p2, p3) {
            //console.log('Error : p1:', p1, 'p2:', p2, 'p3:', p3);
        });
    }
})();



