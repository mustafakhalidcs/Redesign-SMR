angular.module('starter.controllers')
    .controller('HomeCtrl', function($scope, $ionicModal) {
        $scope.items = [
            { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 1 },
            { name: "anmol irfan", to: "peshawar", from: "karachi", image: "img/76.jpg", date: "23/06/2016", id: 2 },
            { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 3 },
            { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 4 },
            { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 5 },
            { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 6 },
            { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 7 }
        ];

        $ionicModal.fromTemplateUrl('login.html', {
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
