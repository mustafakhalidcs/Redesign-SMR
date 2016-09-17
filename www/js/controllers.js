angular.module('starter.controllers', ['oitozero.ngSweetAlert'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope , $state) {
    // if (angular.isUndefined($rootScope.user_id) || $rootScope.user_id == null) {
    //     $state.go('app.signin');
    // }
    $scope.logout = function(){
        $rootScope.user_id = {};
    }

})

// With the new view caching in Ionic, Controllers are only called
// when they are recreated or on app start, instead of every page change.
// To listen for when this page is active (for example, to refresh data),
// listen for the $ionicView.enter event:
//$scope.$on('$ionicView.enter', function(e) {
//});



.controller('demoCtrl', ['SweetAlert', function(SweetAlert) {
    var vm = this;
    vm.alert = function() {
        SweetAlert.swal("I'm a fancy Alert"); //simple alert
    }
    vm.confirm = function() {
        SweetAlert.swal({

            title: "Are you sure?",
            text: "You want to cancel the plan?",
            type: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true
        }, function() {
            swal("Cancel!", "Your Plan has been cancelled.", "success");
        });
    }
}])

.controller('ProfileCtrl', function($scope, $http, $rootScope) {
        console.log($rootScope.user_id);

        $http({
            method: "GET",
            params: { userid: $rootScope.user_id },
            url: "http://localhost:8080/test/api.php"
        }).then(function(response) {
            console.log(response);
        });



    })
    .controller('tourDetailCtrl', function($scope , $stateParams) {
        console.log($stateParams);
    })




.controller('ModalCtrl', function($scope, $ionicModal, $http, SweetAlert, $state, $rootScope ,$filter) {
    console.log($rootScope.user_id);
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
    $scope.types = [
        { type: "Car" },
        { type: "suzuki" },
        { type: "bolan suzuki" },
        { type: "jeep" }
    ];
    $scope.date = new Date();

    $scope.driver = {};
    $scope.driverform = function() {
        console.log($scope.driver.vehicle_type.type);
        $scope.modified_date = $filter('date')($scope.date, 'yyyy-MM-dd');
        $scope.departure_date = $filter('date')($scope.driver.departure_date, 'yyyy-MM-dd');
        $http({
            method: 'POST',
            data: $.param({
                'destination': $scope.driver.destination,
                'current_location': $scope.driver.current_location,
                'route': $scope.driver.route,
                'departure_date': $scope.departure_date,
                'modified_date' : $scope.modified_date,
                'departure_time': $scope.driver.departure_time,
                'per_head_charge': $scope.driver.per_head_charge,
                'available_seats': $scope.driver.available_seats,
                'vehicle_type': $scope.driver.vehicle_type.type,
                'vehicle_number': $scope.driver.vehicle_number,
                'smoker': $scope.driver.smoker,
                'music_listener': $scope.driver.music_listener,
                'email': $rootScope.user_id,
                "planof": "driver",
                "role" : "driver",
                "command": "postplan"
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            url: "http://localhost:8080/ShareMyRide/driver-plan.php"
        }).success(function(data, status, headers, config) {
            console.log(data);
            SweetAlert.swal("", " Your Plan Has been posted successfully!", "success");

        });
    }
})


.controller('RiderModalCtrl', function($scope, $ionicModal, $http, SweetAlert, $state, $rootScope, $filter) {


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
        $scope.date = new Date();
        $scope.rider = {};
        $scope.riderform = function() {
            $scope.modified_date = $filter('date')($scope.date, 'yyyy-MM-dd');
            $scope.departure_date = $filter('date')($scope.rider.departure_date, 'yyyy-MM-dd');
            $http({
                method: 'POST',
                data: $.param({
                    'destination': $scope.rider.destination,
                    'current_location': $scope.rider.current_location,
                    'route': $scope.rider.route,
                    'departure_date': $scope.departure_date,
                    'modified_date' : $scope.modified_date,
                    'departure_time': $scope.departure_date,
                    'seats_required': $scope.rider.seats_required,
                    'smoker': $scope.rider.smoker,
                    'music_listener': $scope.rider.music_listener,
                    'email': $rootScope.user_id,
                    "planof": "rider",
                    "role" : "rider",
                    "command": "postplan"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: "http://localhost:8080/ShareMyRide/driver-plan.php"
            }).success(function(data, status, headers, config) {
                $state.go('app.tours-list', { "destination": $scope.rider.destination, "departure_date": $scope.departure_date ,"command": "findpeople" });
                SweetAlert.swal("", " Your plan has been posted ", "success");
            });
        }


    })
    .controller('tourCtrl', function($scope, $http, $stateParams) {
       if($stateParams){
            $http({
                url: "http://localhost:8080/ShareMyRide/tours-list.php", 
                method: "GET",
                params: {"departure_date" : $stateParams.departure_date , "destination" : $stateParams.destination}
            }).then(function(response){
               $scope.tours = response.data;
               console.log($scope.tours);
            });
        }
        else{
            $http({
                url: "http://localhost:8080/ShareMyRide/tours-list.php", 
                method: "GET",
            }).then(function(response){
                $scope.tours = response.data;
                console.log($scope.tours);
            });
        }
    })

.controller('HomeCtrl', function($scope, $ionicModal, $rootScope, $state) {
    if (angular.isUndefined($rootScope.user_id) || $rootScope.user_id == null) {
        $state.go('app.signin');
    }
    $scope.items = [
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 1 },
        { name: "anmol irfan", to: "peshawar", from: "karachi", image: "img/76.jpg", date: "23/06/2016", id: 2 },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 3 },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 4 },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 5 },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 6 },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016", id: 7 }
    ];


})


.controller('NotifCtrl', function($scope) {
    $scope.notifs = [
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" }

    ];

})

.controller('UptoursCtrl', function($scope) {
    $scope.notifs = [
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" }

    ];

})

.controller('signin', function($scope, $http, SweetAlert, $state, $rootScope, $ionicLoading , $timeout) {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        }).then(function() {
            $scope.signin = {};
            $rootScope.loggedin = {};
            $rootScope.user_id = {};
            $scope.signIn = function() {
                $http({
                    method: 'POST',
                    data: $.param({
                        'email': $scope.signin.email,
                        'password': $scope.signin.password,
                        "command": "loginRequest"
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    url: "http://localhost:8080/ShareMyRide/login.php"
                }).success(function(data, status, headers, config) {
                    if (data == 1) {
                        $rootScope.user_id = $scope.signin.email;
                        SweetAlert.swal("", "Successfull log in", "success");
                        $state.go('app.home');
                    } else {
                        SweetAlert.swal({
                            title: "Credentials mismatch!",
                            text: "Do you want to create a new account?",
                            type: "error",
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        }, function() {
                           console.log()
                        });
                    }
                });
            }
        });
        $timeout(function () {
            console.log('Hiding Now')
            $ionicLoading.hide();
        }, 2000);
        
    })
    .controller('SignupCtrl', function($scope, $http, SweetAlert) {
        $scope.signup = {};
        $scope.signUp = function() {
            $http({
                method: 'POST',
                data: $.param({
                    'first_name': $scope.signup.first_name,
                    'last_name': $scope.signup.last_name,
                    'mobile': $scope.signup.mobile,
                    'resident_of': $scope.signup.resident_of,
                    'email': $scope.signup.email,
                    'password': $scope.signup.password,
                    'NIC': $scope.signup.NIC,
                    "command": "createUser"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: "http://localhost:8080/ShareMyRide/signup.php"
            }).success(function(data, status, headers, config) {
                SweetAlert.swal("", $scope.signup.first_name + " Your acount has been created", "success");
                console.log('Data posted');
            });
        }
    })
    
