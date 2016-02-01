(function() {
    angular.module('avatar').directive('avatarComponents', avatarComponents);

    function avatarComponents() {
        return {
            restrict: 'E',
            templateUrl: 'components/avatar/avatar-component/avatarComponents.html',
            scope: {
                components: '='
            },

            controller: function ($rootScope,  AvatarService) {
                var vm = this;
                angular.extend(vm, AvatarService.getComponents());
                angular.extend(vm, {
                    addToCanvas: addToCanvas
                });

                function addToCanvas(type, index) {
                    var component = AvatarService.getComponents(type)[index];
                    vm.components[type] = component.url;

                    $rootScope.$emit('component-update');
                }

            },

            controllerAs: 'avatarComponentsCtrl',
            bindToController: true
        }
    }
})();