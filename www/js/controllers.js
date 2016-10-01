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
            params: { user_id: $rootScope.user_id , "command" : "profile"},
            url: "http://localhost:8080/ShareMyRide/user-profile.php"
        }).then(function(response) {
            $scope.user_data = response.data;
            console.log($scope.user_data);
        });



    })
    .controller('tourDetailCtrl', function($scope , $stateParams , $http , $rootScope , SweetAlert) {
        /*
        @ Join request from rider     
        */
        $scope.isDisabled = false;
        $scope.join = function(email) {
            $scope.driver_email=email;
            console.log($rootScope.user_id);
            console.log($stateParams.plan_id);
            $scope.isDisabled = true;
            $http({
            method: 'POST',
            data: $.param({
                'plan_id' : $stateParams.plan_id,
                'email' : $rootScope.user_id,
                'driver_email' : email,
                "command" : "joinRequest"
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            url: "http://localhost:8080/ShareMyRide/request.php"
        }).success(function(data, status, headers, config) {
            console.log(data);
            if(data == 1){
                $scope.isDisabled = true;
                SweetAlert.swal("", " Your request has been sent!", "success");
            }
            else{
                console.log(data + " Some error");
            }
        });

        }
        console.log("Plan_id is : "+ $stateParams.plan_id);
        $http({
            method: "GET",
            url: "http://localhost:8080/ShareMyRide/tour-detail.php",
            params: {"plan_id" :  $stateParams.plan_id ,"command" : "tourDetail"},
        }).then(function(response) {
            $scope.detail = response.data;
            var data = response.data;
            $scope.driver_email = data[0].email;
            console.log($rootScope.driver_email);
            console.log($rootScope.user_id);
            
        });

        
        

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
    .controller('tourCtrl', function($scope, $http, $stateParams , $rootScope ,$q) {
       if($stateParams.command == "findpeople"){
        console.log("State params are true");
            $http({
                url: "http://localhost:8080/ShareMyRide/tours-list.php", 
                method: "GET",
                params: {"departure_date" : $stateParams.departure_date , "destination" : $stateParams.destination , "email" : $rootScope.user_id , "command" : $stateParams.command}
            }).then(function(response){
                $scope.tours = response.data;
                console.log($scope.tours);
            });
        }
        else{
            $http({
                url: "http://localhost:8080/ShareMyRide/tours-list.php", 
                method: "GET",
                params:{"email" : $rootScope.user_id , "command" : "listAllTours"}
            }).then(function(response){
                $scope.tours = response.data;
                $scope.tours = [{"first_name":"Murtaza","last_name":"Khalid","email":"admin@test.com","departure_date":"0000-00-00","current_location":"peshawar","destination":"lahore","modified_date":"2016-09-20","plan_id":"6","role":"driver","available_seats":"2","per_head_charge":"800","vehical_type":"jeep"},
                {"first_name":"Murtaza","last_name":"Khalid","email":"admin@test.com","departure_date":"0000-00-00","current_location":"peshawar","destination":"lahore","modified_date":"2016-09-20","plan_id":"6","role":"driver","available_seats":"2","per_head_charge":"800","vehical_type":"jeep"},
                ];
                
                console.log("tour data is : "+$scope.tours);
            });
       }
    })

.controller('HomeCtrl', function($scope, $ionicModal, $rootScope, $state) {
    // if (angular.isUndefined($rootScope.user_id) || $rootScope.user_id == null) {
    //     $state.go('app.signin');
    // }
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


.controller('NotifCtrl', function($scope ,$http, $rootScope) {

    $scope.notifs = [
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" }

    ];
    $http({
            method: "GET",
            params: { "driver_email": $rootScope.user_id , "command" : "showNotifications"},
            url: "http://localhost:8080/ShareMyRide/notification.php"
        }).then(function(response) {
            console.log("data is :" + response.data);
        });

})

.controller('UptoursCtrl', function($scope,$http,$rootScope) {
    $scope.notifs = [
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" }

    ];
    $http({
            method: "GET",
            params: { "driver_email": $rootScope.user_id , "command" : "showUpcomingTours"},
            url: "http://localhost:8080/ShareMyRide/upcoming-tours.php"
        }).then(function(response) {
            console.log("data is :" + response.data);
        });

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
                           console.log();
                        });
                    }
                });
            }
        });
        $timeout(function () {
            console.log('Hiding Now')
            $ionicLoading.hide();
        }, 500);
        
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
    
