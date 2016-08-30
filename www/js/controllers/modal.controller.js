angular.module('starter.controllers')
    .controller('ModalCtrl', function($scope, $ionicModal) {

        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });


        $scope.images = [
            { image: "img/a1.png" },
            { image: "img/a2.png" },
            { image: "img/a3.png" },
            { image: "img/a4.png" },
            { image: "img/a5.png" },
            { image: "img/dabba.png" }
        ]
        $scope.current = 'img/ionic.png';

    })
