(function () {
    angular
        .module('Mentees')
        .factory('MenteesService', MenteesService);

    function MenteesService() {
        var _menteeMentorIds = {};

        return {
            getMenteeMentorLink: getMenteeMentorLink,
            getMentorByMenteeId: getMentorByMenteeId,
            getMentorDescByMenteeId: getMentorDescByMenteeId,
            getMentorsDesc: getMentorsDesc,

            setMenteeMentorIds: setMenteeMentorIds,
            getMenteeMentorIds: getMenteeMentorIds
        };

        function getMenteeMentorLink(mentees, mentors) {
            var menteeMentorIds = {};
            mentees.forEach(function (mentee) {
                menteeMentorIds[mentee._id] = _getMentorInfoByMenteeId(mentee._id, mentors);
            });

            return menteeMentorIds;
        }

        function getMentorByMenteeId(menteeId, mentors) {

            return _getMentorByMenteeId(menteeId, mentors);
        }

        function getMentorDescByMenteeId(menteeId, mentors) {
            return _getMentorInfoByMenteeId(menteeId, mentors);
        }

        function getMentorsDesc(mentors) {
            var mentorsDesc = {};
            mentors.forEach(function (mentor) {
                mentorsDesc[mentor._id] = mentor.name + ' ' + mentor.surname;
            });

            return mentorsDesc;
        }

        function setMenteeMentorIds(menteeId, mentorId) {
            _menteeMentorIds[menteeId] = mentorId;
        }

        function getMenteeMentorIds(menteeId) {
            return _menteeMentorIds[menteeId];
        }

        function _getMentorByMenteeId(menteeId, mentors) {
            var _mentors = mentors.filter(function (mentor) {
                return mentor.mentees && ~mentor.mentees.indexOf(menteeId);
            });

            if (_mentors.length) {
                return _mentors[0];
            }
            return undefined;
        }

        function _getMentorInfoByMenteeId(menteeId, mentors) {
            var mentor = _getMentorByMenteeId(menteeId, mentors);

            if (mentor) {
                return {
                    id: mentor._id,
                    desc: mentor.name + ' ' + mentor.surname
                };
            }
            return {
                id: '',
                desc: ''
            };
        }
    }
})();


