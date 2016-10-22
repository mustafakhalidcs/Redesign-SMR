angular.module('starter.controllers', ['oitozero.ngSweetAlert'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $state) {
    if (angular.isUndefined($rootScope.user_id) || $rootScope.user_id == null) {
        $state.go('app.signin');
    }
    $scope.logout = function() {
        $rootScope.user_id = null;
    }

})


.controller('ProfileCtrl', function($scope, $http, $rootScope, $stateParams, $q) {
        console.log($rootScope.user_id);
        var deferred = $q.defer();
        //$scope.viewProfile = function(){
        console.log("We are viewing profile of : " + $rootScope.user_id);
        $http({
            method: "GET",
            params: { user_id: $rootScope.user_id, "command": "profile" },
            url: "http://localhost:8080/ShareMyRide/user-profile.php"
        }).then(function(response) {
            $scope.user_data = response.data;
            deferred.resolve();
            console.log("Profile data is : " + $scope.user_data);
        });
        //}
    })
    .controller('tourDetailCtrl', function($state, $scope, $stateParams, $http, $rootScope, SweetAlert, $ionicModal, $ionicLoading, $q) {
        $scope.isDisabled = false;

        $scope.joinRequest = function(driver_email, driver_plan_id) {
            var deferred = $q.defer();
            $ionicLoading.show();
            $http({
                method: "GET",
                url: "http://localhost:8080/ShareMyRide/rider-tours.php",
                params: {
                    "rider_plan_id": $stateParams.plan_id,
                    "driver_plan_id": driver_plan_id,
                    "command": "fetchRidertours"
                }
            }).then(function(response) {
                if(response.data[0].plan_id){
                    $scope.riderTours = response.data;
                    deferred.resolve($scope.riderTours);
                    $ionicLoading.hide();
                    console.log($scope.riderTours);
                }
            }, function(error) {
                $scope.riderTours = error;
                deferred.reject(error);
            });
            $scope.riderTours = deferred.promise;
        }
        $scope.sendRequest = function(rider_plan_id, driver_email) {
            console.log($stateParams.plan_id);
            console.log(rider_plan_id);
            console.log(rider_plan_id);
            console.log("Driver Email: " + driver_email);
            $scope.isDisabled = true;
            $http({
                method: 'POST',
                data: $.param({
                    'rider_plan_id': rider_plan_id,
                    'plan_id': $stateParams.plan_id,
                    'driver_email': driver_email,
                    'email': $rootScope.user_id,
                    "command": "joinRequest"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: "http://localhost:8080/ShareMyRide/request.php"
            }).success(function(data, status, headers, config) {
                console.log(data);
                if (data == 1) {
                    $scope.isDisabled = true;
                    SweetAlert.swal("", " Your request has been sent!", "success");
                } else {
                    console.log(data + " Some error");
                }
            });

        }
        console.log("Plan_id is : " + $stateParams.plan_id);
        $http({
            method: "GET",
            url: "http://localhost:8080/ShareMyRide/tour-detail.php",
            params: { "plan_id": $stateParams.plan_id, "command": "tourDetail" },
        }).then(function(response) {
            $scope.detail = response.data;
            var data = response.data;
            $scope.driver_email = data[0].email;
            console.log($rootScope.user_id);

        });
    $scope.share = function() {
			alert("Share");
			 $cordovaSocialSharing.share('Check out the plan of ShareMyRide', 'Subject', null, 'http://www.google.com');

		}


    })
    .controller('filterTourDetail', function($scope, $rootScope, $http) {
        $scope.sendJoinRequest = function(driver_email, driver_plan_id) {
            console.log($stateParams.plan_id);
            console.log(rider_plan_id);
            console.log(rider_plan_id);
            $scope.isDisabled = true;
            $http({
                method: 'POST',
                data: $.param({
                    'rider_plan_id': rider_plan_id,
                    'plan_id': $stateParams.plan_id,
                    'driver_email': driver_email,
                    'email': $rootScope.user_id,
                    "command": "joinRequest"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: "http://localhost:8080/ShareMyRide/request.php"
            }).success(function(data, status, headers, config) {
                console.log(data);
                if (data == 1) {
                    $scope.isDisabled = true;
                    SweetAlert.swal("", " Your request has been sent!", "success");
                } else {
                    console.log(data + " Some error");
                }
            });

        }
    })

.controller('ModalCtrl', function($scope, $ionicModal, $http, SweetAlert, $state, $rootScope, $filter) {
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
                'modified_date': $scope.modified_date,
                'departure_time': $scope.driver.departure_time,
                'per_head_charge': $scope.driver.per_head_charge,
                'available_seats': $scope.driver.available_seats,
                'vehicle_type': $scope.driver.vehicle_type.type,
                'vehicle_number': $scope.driver.vehicle_number,
                'smoker': $scope.driver.smoker,
                'music_listener': $scope.driver.music_listener,
                'email': $rootScope.user_id,
                "planof": "driver",
                "role": "driver",
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
                    'modified_date': $scope.modified_date,
                    'departure_time': $scope.departure_date,
                    'seats_required': $scope.rider.seats_required,
                    'smoker': $scope.rider.smoker,
                    'music_listener': $scope.rider.music_listener,
                    'email': $rootScope.user_id,
                    "planof": "rider",
                    "role": "rider",
                    "command": "postplan"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: "http://localhost:8080/ShareMyRide/driver-plan.php"
            }).success(function(data, status, headers, config) {
                $state.go('app.filtered-tour-list', { "destination": $scope.rider.destination, "departure_date": $scope.departure_date, "command": "findpeople" });
                SweetAlert.swal("", " Your plan has been posted ", "success");
            });
        }


    })
    .controller('FilterTourList', function($stateParams, $scope, $rootScope,
        $http) {
        console.log("State params are true");
        $http({
            url: "http://localhost:8080/ShareMyRide/tours-list.php",
            method: "GET",
            params: { "departure_date": $stateParams.departure_date, "destination": $stateParams.destination, "email": $rootScope.user_id, "command": $stateParams.command }
        }).then(function(response) {
            $scope.tours = response.data;
            console.log($scope.tours);
        });

    })
    .controller('tourCtrl', function($scope, $http, $rootScope) {

        $http({
            url: "http://localhost:8080/ShareMyRide/tours-list.php",
            method: "GET",
            params: { "email": $rootScope.user_id, "command": "listAllTours" }
        }).then(function(response) {
            $scope.tours = response.data;
            console.log("tour data is : " + $scope.tours);
        });

        $scope.getToursList = function() {
            console.log("Hello from getToursList method");
            $http({
                url: "http://localhost:8080/ShareMyRide/tours-list.php",
                method: "GET",
                params: { "email": $rootScope.user_id, "command": "listAllTours" }
            }).then(function(response) {
                $scope.tours = response.data;
                console.log("tour data is : " + $scope.tours);
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


.controller('NotifCtrl', function($scope, $http, $rootScope) {
        console.log('Hello from view Notification');
        $scope.isAllowed = false;
        $scope.markAsRead = function(plan_id) {
            console.log(plan_id);
            $http({
                method: 'POST',
                data: $.param({
                    'plan_id': plan_id,
                    "command": "markAsRead"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: "http://localhost:8080/ShareMyRide/manage-notification.php"
            }).success(function(data, status, headers, conupfig) {
                if (data == 1) {
                    console.log("marked as read");
                } else {
                    console.log(data);
                }
            });
        };
        $scope.acceptRequest = function(rider_plan_id,driver_plan_id) {
            console.log(rider_plan_id);
            console.log(driver_plan_id);
            $http({
                method: 'POST',
                data: $.param({
                    'rider_plan_id': rider_plan_id,
                    'driver_plan_id' : driver_plan_id,
                    "command": "manageRequest",
                    "operation": "accept"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: "http://localhost:8080/ShareMyRide/manage-notification.php"
            }).success(function(data, status, headers, conupfig) {
                if (data == 1) {
                    console.log("Successful operation");
                    $scope.isAllowed = true;
                } else {
                    console.log(data);
                }
            });
        }
        $scope.rejectRequest = function(rider_plan_id) {
            $http({
                method: 'POST',
                data: $.param({
                    'rider_plan_id': rider_plan_id,
                    "command": "manageRequest",
                    "operation": "reject"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: "http://localhost:8080/ShareMyRide/manage-notification.php"
            }).success(function(data, status, headers, conupfig) {
                if (data == 1) {
                    console.log("Successful operation");
                    $scope.isAllowed = true;
                } else {
                    console.log(data);
                }
            });
        }
        $http({
            method: "GET",
            params: { "driver_email": $rootScope.user_id, "command": "showNotifications" },
            url: "http://localhost:8080/ShareMyRide/notification.php"
        }).then(function(response) {
            if (response.data[0].plan_id) {
            $scope.notifications = response.data;
            }
            console.log(response);
        });

    })
    .controller('riderNotifCtrl', function($scope, $http, $rootScope) {
        $http({
            method: "GET",
            params: { "rider_email": $rootScope.user_id, "command": "showNotifications" },
            url: "http://localhost:8080/ShareMyRide/rider-notification.php"
        }).then(function(response) {
            if(response.data[0].plan_id){
                $scope.notifications = response.data;
                console.log($scope.notifications);
            }
        });
        $scope.markAsRead = function(plan_id) {
            console.log(plan_id);
            $http({
                method: 'POST',
                data: $.param({
                    'plan_id': plan_id,
                    "command": "markNotificationAsRead"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: "http://localhost:8080/ShareMyRide/manage-notification.php"
            }).success(function(data, status, headers, conupfig) {
                if (data == 1) {
                    console.log("marked as read");
                } else {
                    console.log(data);
                }
            });
        }
    })

.controller('UptoursCtrl', function($scope, $http, $rootScope, $ionicLoading, $q) {
    var deferred = $q.defer();
            $ionicLoading.show();
            $http({
                method: "GET",
                url: "http://localhost:8080/ShareMyRide/upcoming-tours.php",
                params: {
                    "email": $rootScope.user_id,
                    "command": "showUpcomingTours"
                }
            }).then(function(response) {
                console.log(response.data);
                if(response.data[0].destination){
                    $scope.MyTours = response.data;
                    deferred.resolve($scope.MyTours);
                    $ionicLoading.hide();
                    console.log($scope.MyTours);
                }
            }, function(error) {
                $scope.riderTours = error;
                deferred.reject(error);
            });
            $scope.MyTours = deferred.promise;
    // var deferred = $q.defer();
    // $ionicLoading.show({
    //     template: 'Loading...'
    // });
    // $http({
    //     method: "GET",
    //     params: { "email": $rootScope.user_id, "command": "showUpcomingTours" },
    //     url: "http://localhost:8080/ShareMyRide/upcoming-tours.php"
    // }).then(function(response) {
    //     $scope.upcoming_tours = response.data;
    //     deferred.resolve($scope.upcoming_tours);
    //     $ionicLoading.hide();
    // });
    // $scope.upcoming_tours = deferred.promise;
    // console.log($scope.upcoming_tours);
})

.controller('signin', function($scope, $http, SweetAlert, $state, $rootScope, $ionicLoading, $timeout) {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 1000,
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
                }).success(function(data, status, headers, conupfig) {
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
        $timeout(function() {
            console.log('Hiding Now')
            $ionicLoading.hide();
        }, 1000);

    })
    .controller('SignupCtrl', function($scope, $http, SweetAlert,$rootScope,$state) {
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
                if(data == 1){
                SweetAlert.swal("", $scope.signup.first_name + " Your acount has been created", "success");
                $rootScope.user_id = $scope.signup.email;
                $state.go('app.home');
                }
                else{
                    SweetAlert.swal("","Error occured while creating new user", "warning");
                }
            });
        }
    })

// .factory('tourslistService' , function($http){
//     return {
//         all : function(){
//             return $http({
//                 url: "http://localhost:8080/ShareMyRide/tours-list.php", 
//                 method: "GET",
//                 params:{"email" : $rootScope.user_id , "command" : "listAllTours"}
//             });
//         }

//     }
// })
.factory('httpService', function($http, $rootScope) {
    var factory = {};
    factory.tourList = function() {
        console.log("Hello from service tour list");
        $http({
            url: "http://localhost:8080/ShareMyRide/tours-list.php",
            method: "GET",
            params: { "email": $rootScope.user_id, "command": "listAllTours" }
        });
    }
    factory.viewProfile = function() {
        console.log("Hello from service View profile");
        $http({
            method: "GET",
            params: { user_id: $rootScope.user_id, "command": "profile" },
            url: "http://localhost:8080/ShareMyRide/user-profile.php"
        }).then(function(response) {
            $scope.user_data = response.data;
            console.log("Profile data is : " + $scope.user_data);
        });
    }
    factory.getUpcomingTours = function() {
        $http({
            method: "GET",
            params: { "email": $rootScope.user_id, "command": "showUpcomingTours" },
            url: "http://localhost:8080/ShareMyRide/upcoming-tours.php"
        });
        return
    }
    return factory;
})
