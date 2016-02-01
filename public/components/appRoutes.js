angular.module('sampleApp').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController',
            resolve: {
                mentees: function (DataSyncService) {
                    return DataSyncService.getAllMentees();
                },
                mentors: function (DataSyncService) {
                    return DataSyncService.getAllMentors();
                }
            }
        })
        .when('/mentors/:id', {
            templateUrl: 'components/mentor/Mentor.html',
            controller: 'MentorController',
            resolve: {
                mentees: function (DataSyncService) {
                    return DataSyncService.getAllMentees();
                },
                mentor: function (DataSyncService) {
                    return DataSyncService.getMentor();
                }
            }
        })
        .when('/mentees/:id', {
            templateUrl: 'components/mentee/Mentee.html',
            controller: 'MenteeController',
            resolve: {
                mentee: function (DataSyncService) {
                    return DataSyncService.getMentee();
                },
                mentors: function (DataSyncService) {
                    return DataSyncService.getAllMentors();
                }
            }
        })


        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);
