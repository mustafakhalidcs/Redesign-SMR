angular.module('starter.controllers')
    .controller('RiderModalCtrl', function($scope, $ionicModal) {

        $ionicModal.fromTemplateUrl('riderform.html', {
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

    })
