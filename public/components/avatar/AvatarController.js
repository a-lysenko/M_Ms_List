(function () {
    angular
        .module('avatar')
        .controller('AvatarController', AvatarController);

    function AvatarController($rootScope, $scope, $modalInstance) {
        var canvas,
            context,
            images;

        angular.extend($scope, {
            components: {},

            ok: ok,
            cancel: cancel
        });

        function ok() {
            $modalInstance.close(canvas.toDataURL());
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        $rootScope.$on('avatar-rendered', processProtoFace);

        $rootScope.$on('component-update', updateCanvas);

        function updateCanvas() {
            processProtoFace();

            for (var componentType in $scope.components) {
                var url = $scope.components[componentType];
                processComponent(url);
            }
        }

        function processProtoFace() {
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
            images = [];
            processComponent('img/avatar-components/proto_face.png');
        }

        function processComponent(url) {
            canvas = canvas || $('#avatar')[0];
            context = context || canvas.getContext('2d');

            protoFace = new Image();
            images.push(protoFace);

            protoFace.src = url;
            protoFace.onload = function () {
                images.forEach(function (image) {
                    context.drawImage(image, 0, 0);
                });
            };
        }
    }
})();



