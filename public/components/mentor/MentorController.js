(function () {
    angular
        .module('Mentor')
        .controller('MentorController', MentorController);

    function MentorController($scope, MentorService, mentor, mentees) {
        angular.extend($scope, {
            mentees: mentees,
            mentor: mentor,
            mentorMenteesDesc: MentorService.getMentorMenteesDesc(mentor, mentees),

            isAssignedToMentor: isAssignedToMentor
        });

        function isAssignedToMentor(mentee) {
            return mentor.mentees && ~mentor.mentees.indexOf(mentee._id);
        }

        $scope.$on('$routeChangeError', function (p1, p2, p3) {
            //console.log('Error : p1:', p1, 'p2:', p2, 'p3:', p3);
        });
    }
})();



