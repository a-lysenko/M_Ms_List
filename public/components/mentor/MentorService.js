(function () {
    angular
        .module('Mentor')
        .factory('MentorService', MentorService);

    function MentorService() {
        return {
            getMentorMenteesDesc: getMentorMenteesDesc
        };

        function getMentorMenteesDesc(mentor, mentees) {
            var mentorMenteesDesc = [];
            if (mentor.mentees) {
                mentees.forEach(function (mentee) {
                    if (~mentor.mentees.indexOf(mentee._id)) {
                        mentorMenteesDesc.push(mentee.name + ' ' + mentee.surname);
                    }
                });
            }
            return mentorMenteesDesc;
        }
    }
})();