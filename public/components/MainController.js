(function () {
    'use strict';

    angular
        .module('sampleApp')
        .controller('MainController', MainController);

    function MainController($scope, mentees, mentors, AddPersonService) {
        angular.extend($scope, {
            mentees: mentees,
            mentors: mentors
        });
    }
})();

