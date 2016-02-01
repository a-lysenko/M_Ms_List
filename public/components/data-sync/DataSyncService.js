(function () {
    'use strict';

    angular
        .module('dataSync')
        .factory('DataSyncService', DataSyncService);

    function DataSyncService($http, $q, $route) {
        return {
            getAllMentors: getAllMentors,
            getAllMentees: getAllMentees,
            getMentor: getMentor,
            getMentee: getMentee,
            getMentorMentees: getMentorMentees,

            unassignMentee: unassignMentee,
            assignMentee: assignMentee,

            addPerson: addPerson,

            changePhotoUrl: changePhotoUrl,

            validatePersonData: validatePersonData
        };

        function getAllMentors() {

            return $http.get('/get_AllMentors')
                .then(function (response) {
                    return response.data.mentors || [];
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        function getAllMentees() {

            return $http.get('/get_AllMentees')
                .then(function (response) {
                    return response.data.mentees || [];
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        function getMentor(mentorId) {
            mentorId = mentorId || $route.current.params.id;
            return $http.get('/get_Mentor/' + mentorId)
                .then(function (response) {
                    return response.data.mentor || {};
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        function getMentee() {
            return $http.get('/get_Mentee/' + $route.current.params.id)
                .then(function (response) {
                    return response.data.mentee || {};
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        function getMentorMentees(mentor) {
            return $http.get('/get_MentorMentees', {
                menteeIds: mentor.mentees,
                qty: mentor.mentees.length
            })
                .then(function (response) {
                    return response.data.mentees || [];
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        function unassignMentee(menteeId, mentor) {
            return $http.post('/unassign_Mentee',
                {menteeId: menteeId, mentorId: mentor._id, mentees: mentor.mentees}
            )
                .then(function (response) {
                    return response.data.mentor || {};
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        function assignMentee(menteeId, mentor) {
            return $http.post('/assign_Mentee',
                {menteeId: menteeId, mentorId: mentor._id, mentees: mentor.mentees}
            )
                .then(function (response) {
                    return response.data.mentor || {};
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        function addPerson(personType, personData) {
            var serviceUrl = '/';
            if (personType === 'mentor') {
                serviceUrl = '/add_Mentee';
            }
            if (personType === 'mentor') {
                serviceUrl = '/add_Mentor';
            }

            return $http.post(serviceUrl, personData)
                .then(function (response) {
                    return response.data || {};
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        function changePhotoUrl(objectType, objectId, photoURL) {
            var serviceUrl = '/' + objectType + 'ChangePhotoURL';

            return $http.post(serviceUrl,
                {objectId: objectId, photoURL: photoURL})
                .then(function (response) {
                    return response.data.object || {};
                }, function (reason) {
                    return $q.reject(reason);
                });
        }

        function validatePersonData(personData) {
            var deferred = $q.defer();

            $http.post('/validatePersonData', {personData: personData})
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (reason) {
                    deferred.reject(reason.data);
                });

            return deferred.promise;
        }
    }
})();