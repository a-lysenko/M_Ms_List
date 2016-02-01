(function () {
    angular
        .module('sampleApp')
        .directive('personListHeader', personListHeader);

    function personListHeader() {
        return {
            restrict: 'E',
            scope: {},
            replace: false,
            transclude: true,
            templateUrl: 'components/person-list/personListHeader.html'
        }
    }
})();