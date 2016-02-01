(function () {
    'use strict';

    angular
        .module('sampleApp')
        .directive('person', person);

    function person() {
        return {
            restrict: 'E',
            scope: {
                personObj: '=',
                mLinkGroup: '@',
                mExtraValue: '&',
                personObjType: '@'
            },
            replace: false,
            transclude: true,

            templateUrl: function (elem, attrs) {
                return (attrs.personTemplateType === 'details') ?
                    'components/person/personDetails.html' :
                    'components/person/person.html';
            },
            controller: function ($rootScope, DataSyncService, AvatarService) {
                var vm = this;
                var imgPhoto;
                angular.extend(vm, {
                    infos: {
                        name: "Name",
                        surname: "Surname",
                        phone: "Phone",
                        mail: 'Email'
                    },
                    loadSpinnerURL: './svg-loaders/circles.svg',
                    defaultPhotoURL: './img/no-photo.jpg',
                    photoURL: vm.personObj.photoURL,
                    photoPlaceholder: 'input photo URL',

                    computedName: computedName,
                    changePhotoURL: changePhotoURL,
                    showModalToCreateAvatar: showModalToCreateAvatar
                });

                activate();

                function activate() {
                    _showPhoto();
                }

                function changePhotoURL() {
                    _getImgElement().src = vm.loadSpinnerURL;

                    DataSyncService.changePhotoUrl(vm.personObjType, vm.personObj._id, vm.photoURL)
                        .then(_showPhoto);
                }

                function showModalToCreateAvatar() {
                    AvatarService.showModalToCreateAvatar(successCallback);
                }

                function successCallback(photoBase64) {
                    vm.photoURL = photoBase64;
                    changePhotoURL();
                }

                function computedName() {
                    return [
                        vm.personObjType,
                        ': ',
                        vm.personObj.name,
                        ' ',
                        vm.personObj.surname].join('');
                }

                function _showPhoto() {
                    var img = new Image();
                    img.src = vm.photoURL;
                    img.height = 100;
                    img.name = "photo";

                    img.onload = function() {
                        _getImgElement().src = img.src;
                    };

                    img.onerror = function () {
                        _getImgElement().src = vm.defaultPhotoURL;
                    }
                }

                function _getImgElement() {
                    return $('#photo_' + vm.personObj._id)[0];
                }
            },
            controllerAs: 'personCtrl',
            bindToController: true
        }
    }
})();