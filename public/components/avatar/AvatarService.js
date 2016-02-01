(function () {
    angular
        .module('avatar')
        .factory('AvatarService', AvatarService);

    function AvatarService($modal, $rootScope, $log) {
        return {
            getComponents: getComponents,
            showModalToCreateAvatar: showModalToCreateAvatar
        };

        function getComponents(type) {
            var hairDir = 'img/avatar-components/hair/',
                eyesDir = 'img/avatar-components/eyes/',
                noseDir = 'img/avatar-components/nose/',
                mouthDir = 'img/avatar-components/mouth/';

            var components = {
                eyes: [
                    {
                        name: 'blue',
                        url: eyesDir + 'blue.png'
                    },
                    {
                        name: 'glasses',
                        url: eyesDir + 'glasses.png'
                    },
                    {
                        name: 'green',
                        url: eyesDir + 'green.png'
                    },
                    {
                        name: 'usual',
                        url: eyesDir + 'usual.png'
                    }
                ],
                hair: [
                    {
                        name: 'blond',
                        url: hairDir + 'blond.png'
                    },
                    {
                        name: 'bold',
                        url: hairDir + 'bold.png'
                    },
                    {
                        name: 'brown',
                        url: hairDir + 'brown.png'
                    },
                    {
                        name: 'red hat',
                        url: hairDir + 'red-hat.png'
                    }
                ],
                mouth: [
                    {
                        name: 'open-with-beard',
                        url: mouthDir + 'open-with-beard.png'
                    },
                    {
                        name: 'red-lipstick',
                        url: mouthDir + 'red-lipstick.png'
                    },
                    {
                        name: 'sad-with-mustache',
                        url: mouthDir + 'sad-with-mustache.png'
                    },
                    {
                        name: 'usual',
                        url: mouthDir + 'usual.png'
                    }
                ],
                nose: [
                    {
                        name: 'curl',
                        url: noseDir + 'curl.png'
                    },
                    {
                        name: 'potato',
                        url: noseDir + 'potatoe.png'
                    },
                    {
                        name: 'usual',
                        url: noseDir + 'usual.png'
                    },
                    {
                        name: 'usual 2',
                        url: noseDir + 'usual2.png'
                    }
                ]
            };

            return (type) ? components[type] : components;
        }

        function showModalToCreateAvatar(successCallback) {
            var modalInstance = $modal.open({
                animation: true,
                size: 'lg',
                templateUrl: 'components/avatar/avatar.html',
                controller: 'AvatarController',
                controllerAs: 'registration'
            });

            modalInstance.rendered
                .then(function () {
                    $rootScope.$emit('avatar-rendered');
                });

            modalInstance.result
                .then(function (picBase64) {
                    successCallback(picBase64);
                }, function (text) {
                    $log.info('Modal dismissed reason: ', text);
                });
        }
    }
})();