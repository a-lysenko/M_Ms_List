(function () {
    angular
        .module('Mentee')
        .factory('MenteeService', MenteeService);

    function MenteeService($rootScope, MenteesService, DataSyncService) {
        var _currentMentorId;

        return {
            updateMentorOfMentee: updateMentorOfMentee,

            setCurrentMentorId: setCurrentMentorId,
            getCurrentMentorId: getCurrentMentorId
        };

        function setCurrentMentorId(mentorId) {
            _currentMentorId = mentorId;
        }

        function getCurrentMentorId() {
            return _currentMentorId;
        }

        function updateMentorOfMentee(menteeId, mentorId) {
            var prevMentorId = getCurrentMentorId();

            DataSyncService.getMentor(prevMentorId)
                .then(function (mentor) {
                    DataSyncService.unassignMentee(menteeId, mentor);

                    DataSyncService.getMentor(mentorId)
                        .then(function(mentor) {
                            DataSyncService.assignMentee(menteeId, mentor);

                            setCurrentMentorId(mentor._id);
                            //$rootScope.$broadcast('update-mentors');
                        });
                });
        }
    }
})();