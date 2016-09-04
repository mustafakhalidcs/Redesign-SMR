angular.module('starter.controllers', ['oitozero.ngSweetAlert'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    })

//.controller('colorCtrl', function($scope) {
//    $scope.colors = [
//        { color : "red"},
//        {color : "white"},
//        { color : "black"}
//    ];
//})
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

.controller('ProfileCtrl', function($scope) {

    $scope.items = [
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" },
        { name: "mustafa khalid", to: "nowshera", from: "lahore", image: "img/76.jpg", date: "23/06/2016" }
    ];

})




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
    $scope.types = [
        { type : "Car"},
        {type : "suzuki"},
        { type : "bolan suzuki"},
        { type : "jeep"}
    ];
    $scope.date = new Date();
   

        //  $scope.createContact = function(u) {        
        //    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        //    $scope.modal.hide();
        //  };
//        $scope.images = [
//            { image: "img/a1.png" },
//            { image: "img/a2.png" },
//            { image: "img/a3.png" },
//            { image: "img/a4.png" },
//            { image: "img/a5.png" },
//            { image: "img/dabba.png" }
//        ]
//        $scope.current = 'img/ionic.png';

    })
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
    $scope.date = new Date();

    })


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

    //  $scope.createContact = function(u) {        
    //    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    //    $scope.modal.hide();
    //  };


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

.controller('signin', function($scope , $http , SweetAlert ,$state , $rootScope) {
        $scope.signin = {};
        $rootScope.loggedin = false;
        $scope.signIn = function() {
        $http({
          method: 'POST',
          data: $.param(
            {  
            'email': $scope.signin.email,
            'password': $scope.signin.password,
            "command":"loginRequest"
            }
          ),
          headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
          url: "http://localhost:8080/ShareMyRide/login.php"
          }).success(function(data,status,headers,config){
            console.log(data);
            if(angular.equals(data , "true")){
                SweetAlert.swal("","Successfull log in","success");
                $state.go('app.home');
            }
            else{
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
                   // $state.go('signup');
                });
            }
          });
        }
    })
.controller('SignupCtrl', function($scope , $http ,SweetAlert) {
  $scope.signup = {};
  $scope.signUp = function() { 
    $http({
          method: 'POST',
          data: $.param(
            { 
            'first_name': $scope.signup.first_name,
            'last_name': $scope.signup.last_name,
            'mobile': $scope.signup.mobile,
            'resident_of': $scope.signup.resident_of,
            'email': $scope.signup.email,
            'password': $scope.signup.password,
            'NIC': $scope.signup.NIC,
            "command":"createUser"
            }
          ),
          headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
          url: "http://localhost:8080/ShareMyRide/signup.php"
          }).success(function(data,status,headers,config){
            SweetAlert.swal("",$scope.signup.first_name+" Your acount has been created","success");
            console.log('Data posted');
          });
  }
})
    .controller('PlaylistCtrl', function($scope, $stateParams) {});
